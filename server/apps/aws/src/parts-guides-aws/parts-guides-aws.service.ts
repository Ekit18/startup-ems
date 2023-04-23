import { v4 as uuid } from 'uuid';
import FormData = require('form-data');
import { S3Client, DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PartsGuidesAWS, PARTS_QUEUE, Part } from 'inq-shared-lib';
import { FilesErrorObject } from './parts-guides-aws.controller';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from 'rxjs';
@Injectable()
export class PartsGuidesAwsService {
    constructor(
        private readonly configService: ConfigService,
        @InjectModel(PartsGuidesAWS) private partsGuidesAWSRepository: typeof PartsGuidesAWS,
        @Inject(PARTS_QUEUE) private PartsClient: ClientProxy,
        private readonly s3Client: S3Client,
    ) {
    }

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
        const fileUrl = `https://${uploadParams.Bucket}.s3.${await this.s3Client.config.region()}.amazonaws.com/${uploadParams.Key}`;
        await this.partsGuidesAWSRepository.create({
            url: fileUrl,
            key: uploadParams.Key,
            partId,
            type: fileType,
        });
        const newFile: PartsGuidesAWS = await this.partsGuidesAWSRepository.findOne({
            where: {
                url: fileUrl
            },
            include: { all: true }
        });
        return newFile;
    }

    async addPartImg(partId: number, fileBuffer: Buffer, fileOriginalname: string) {
        const part: Part = await lastValueFrom(this.PartsClient.send({ cmd: "findOneByPartId" }, partId));
        if (!part) {
            throw new HttpException({ message: 'Part with such id does not exist!' }, HttpStatus.BAD_REQUEST);
        }

        const newFile = await this.uploadPublicFile(fileBuffer, fileOriginalname, "Part", partId);

        part.$add('static', [newFile.id]);
        return newFile.url;
    }

    async addGuideImg(partId: number, fileBuffer: Buffer, fileOriginalname: string) {
        const part: Part = await lastValueFrom(this.PartsClient.send({ cmd: "findOneByPartId" }, partId));
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
            'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
            'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
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