import { v4 as uuid } from 'uuid';
import FormData = require('form-data');
import { S3Client, DeleteObjectCommand, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PartsGuidesAWS, PARTS_QUEUE, Part, GetPartTypesByBrandDTO, getAllStaticByBrandAndTypeDTO } from 'inq-shared-lib';
import { FilesErrorObject } from './parts-guides-aws.controller';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from 'rxjs';
import { HttpStatusCode } from 'axios';

type FileType = 'Part' | 'Guide';
export interface StaticFile {
    url: string,
    key: string,
    part: Pick<Part, 'id' | 'brand' | 'name' | 'type'>,
    isGuide: boolean
}

export interface AllStaticFiles {
    partStatic: StaticFile[],
    guideStatic: StaticFile[]
}

@Injectable()
export class PartsGuidesAwsService {
    baseURI: string;
    constructor(
        private readonly configService: ConfigService,
        @InjectModel(PartsGuidesAWS) private partsGuidesAWSRepository: typeof PartsGuidesAWS,
        @Inject(PARTS_QUEUE) private PartsClient: ClientProxy,
        private readonly s3Client: S3Client,
    ) {
        this.baseURI = `https://${this.configService.get('AWS_PUBLIC_BUCKET_NAME')}.s3.${this.configService.get('AWS_REGION')}.amazonaws.com/`;
    }

    async getAllStatic(getAllStaticDTO: getAllStaticByBrandAndTypeDTO): Promise<any> {
        const contents: PartsGuidesAWS[] = await this.partsGuidesAWSRepository.findAll({});

        // ПРАЦЮЄ
        const partStatic = await Promise.all(contents.filter((s3File) => s3File.key.startsWith('Part')).map(async (s3File) => {
            const part: Part = await lastValueFrom(this.PartsClient.send({ role: "parts", cmd: "findOneWithSuchBrandAndType" }, { partId: s3File.partId, brand: getAllStaticDTO.brand, type: getAllStaticDTO.type }));
            return {
                url: this.baseURI + s3File.key,
                key: s3File.key,
                part,
                isGuide: false
            };
        }
        ));

        const guideStatic = await Promise.all(contents.filter((s3File) => s3File.key.startsWith('Guide')).map(async (s3File) => {
            const part: Part = await lastValueFrom(this.PartsClient.send({ role: "parts", cmd: "findOneWithSuchBrandAndType" }, { partId: s3File.partId, brand: getAllStaticDTO.brand, type: getAllStaticDTO.type }));
            console.log(part);
            return {
                url: this.baseURI + s3File.key,
                key: s3File.key,
                part,
                isGuide: true
            };
        }
        ));
        return { partStatic: partStatic.filter(({ part }) => part !== null), guideStatic: guideStatic.filter(({ part }) => part !== null) };
    }

    async getStaticFilesPartBrands() {
        const result = await this.partsGuidesAWSRepository.findAll({ attributes: ["partId"], group: ['partId'] });
        const resultPromise = Promise.all(result.map(async (statImg) => {
            const part: Part = await lastValueFrom(this.PartsClient.send({ role: "parts", cmd: "findOneById" }, statImg.partId));
            console.log(part);
            return part.brand;
        }));
        return resultPromise;
    }

    async getStaticFilesPartTypesOfBrand(selectedBrand: GetPartTypesByBrandDTO) {
        const result = await this.partsGuidesAWSRepository.findAll({ attributes: ["partId"], group: ['partId'] });
        const resultPromise = Promise.all(result.map(async (statImg) => {
            console.log(`RESULT:`);
            console.log(statImg);
            console.log(`RESULT END`);
            const type: string = await lastValueFrom(this.PartsClient.send({ role: "parts", cmd: "getTypeByIdAndBrand" }, { partId: statImg.partId, brand: selectedBrand.brand }));
            console.log(type);
            return type;
        }));
        return (await resultPromise).filter((type) => type !== null);
    }

    async deletePublicFile(key: string) {
        const candidate = this.partsGuidesAWSRepository.findOne({ where: { key } });
        if (!candidate) {
            throw new HttpException("Such key does not exist!", HttpStatus.BAD_REQUEST);
        }
        try {
            const delParams = {
                Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
                Key: key,
            };
            await this.s3Client.send(new DeleteObjectCommand(delParams));
            return this.partsGuidesAWSRepository.destroy({ where: { key } });
        } catch (error) {
            throw new HttpException("CANNOT DELETE STATIC FILE!", HttpStatusCode.BadRequest);
        }
    }


    private async uploadPublicFile(dataBuffer: Buffer, filename: string, fileType: FileType, partId: number) {
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
        const part: Part = await lastValueFrom(this.PartsClient.send({ role: "parts", cmd: "findOneById" }, partId));
        if (!part) {
            throw new HttpException({ message: 'Part with such id does not exist!' }, HttpStatus.BAD_REQUEST);
        }

        const newFile = await this.uploadPublicFile(fileBuffer, fileOriginalname, 'Guide', partId);
        return newFile.url;
    }

    async addGuideImg(partId: number, fileBuffer: Buffer, fileOriginalname: string) {
        const part: Part = await lastValueFrom(this.PartsClient.send({ cmd: "findOneByPartId" }, partId));
        if (!part) {
            throw new HttpException({ message: 'Part with such id does not exist!' }, HttpStatus.BAD_REQUEST);
        }

        const newFile = await this.uploadPublicFile(fileBuffer, fileOriginalname, 'Part', partId);

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
        console.log(headers);
        await httpService.axiosRef.post('https://nsfw3.p.rapidapi.com/v1/results', formData, { headers }).then((response) => {
            isNSFW = response.data.results[0].entities[0].classes.nsfw > 0.5;
        }).catch((error) => {
            throw new HttpException("ERROR_FROM_AXIOS: ", error);
        });
        return isNSFW;
    }
}
