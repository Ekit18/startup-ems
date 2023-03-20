import { Axios } from 'axios';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { S3 } from 'aws-sdk';
import { PartsGuidesAWS, staticType } from './parts-guides-aws.model';
import { v4 as uuid } from 'uuid';
import { Part } from 'src/parts/parts.model';
import fs from 'fs';
import { Readable } from 'stream';
import FormData = require('form-data');
import { HttpService } from '@nestjs/axios';
import { Inject } from '@nestjs/common/decorators';
import { FilesErrorObject } from './parts-guides-aws.controller';


@Injectable()
export class PartsGuidesAwsService {
    constructor(
        private readonly configService: ConfigService,
        @InjectModel(PartsGuidesAWS) private partsGuidesAWSRepository: typeof PartsGuidesAWS,
        @InjectModel(Part) private partRepository: typeof Part,
        private readonly s3Client: S3Client,
    ) { }

    async deletePublicFile(key: string) {
        const candidate = this.partsGuidesAWSRepository.findOne({ where: { key } });
        if (!candidate) {
            throw new HttpException("Such key does not exist!", HttpStatus.BAD_REQUEST);
        }
        const delParams = {
            Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
            Key: key,
        };
        await this.s3Client.send(new DeleteObjectCommand(delParams));
        this.partsGuidesAWSRepository.destroy({ where: { key } });
    }

    private async uploadPublicFile(dataBuffer: Buffer, filename: string, fileType: string, partId: number) {
        const uploadParams = {
            Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
            Body: dataBuffer,
            Key: `${fileType}-${uuid()}-${filename}`,
            ContentDisposition: 'inline;',
            ContentType: `image/${filename.split('.')[1]}`
        };
        await this.s3Client.send(new PutObjectCommand(uploadParams));
        await this.partsGuidesAWSRepository.create({
            url: `https://${uploadParams.Bucket}.s3.${await this.s3Client.config.region()}.amazonaws.com/${uploadParams.Key}`,
            key: uploadParams.Key,
            partId,
            type: fileType,
        });
        const newFile: PartsGuidesAWS = await this.partsGuidesAWSRepository.findOne({
            where: {
                url: `https://${uploadParams.Bucket}.s3.${await this.s3Client.config.region()}.amazonaws.com/${uploadParams.Key}`
            },
            include: { all: true }
        });
        return newFile;
    }

    async addPartImg(partId: number, fileBuffer: Buffer, fileOriginalname: string) {
        const part = await this.partRepository.findOne({ where: { partId } });
        if (!part) {
            throw new HttpException({ message: 'Part with such id does not exist!' }, HttpStatus.BAD_REQUEST);
        }

        const newFile = await this.uploadPublicFile(fileBuffer, fileOriginalname, "Part", partId);

        part.$add('static', [newFile.id]);
        return newFile.url;
    }
    async addGuideImg(partId: number, fileBuffer: Buffer, fileOriginalname: string) {
        const part = await this.partRepository.findOne({ where: { partId } });
        if (!part) {
            throw new HttpException({ message: 'Part with such id does not exist!' }, HttpStatus.BAD_REQUEST);
        }

        const newFile = await this.uploadPublicFile(fileBuffer, fileOriginalname, "Guide", partId);

        part.$add('static', [newFile.id]);
        return newFile.url;
    }
    static async checkNSFWFiles(files: Array<Express.Multer.File>, errObj: FilesErrorObject) {
        errObj.isError = false;
        await Promise.all(await files.map(async (file) => {
            const result = await PartsGuidesAwsService.isNSFW(file.buffer);
            if (result) {
                errObj.isError = true;
                errObj.msg = "NSFW detected";
            }
            return null;
        }
        ));
    }

    static async isNSFW(fileBuffer: Buffer) {
        let isNSFW = false;
        const formData = new FormData();
        formData.append("image", fileBuffer);
        const headers = {
            'Content-Type': 'multipart/form-data',
            'X-RapidAPI-Key': '795a24d60amsh70c7a2ad8cc3586p149a03jsn035c0f30972a',
            'X-RapidAPI-Host': 'nsfw3.p.rapidapi.com',
        };
        const httpService = new HttpService();
        await httpService.axiosRef.post('https://nsfw3.p.rapidapi.com/v1/results', formData, { headers }).then((response) => {
            isNSFW = response.data.results[0].entities[0].classes.nsfw > 0.5;
        }).catch((error) => {
            throw new HttpException("ERROR_FROM_AXIOS: ", error);
        });
        return isNSFW;
    }
}
