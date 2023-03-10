import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { S3 } from 'aws-sdk';
import { PartsGuidesAWS, staticType } from './parts-guides-aws.model';
import { v4 as uuid } from 'uuid';
import { Part } from 'src/parts/parts.model';


@Injectable()
export class PartsGuidesAwsService {
    constructor(
        private readonly configService: ConfigService,
        @InjectModel(PartsGuidesAWS) private partsGuidesAWSRepository: typeof PartsGuidesAWS,
        @InjectModel(Part) private partRepository: typeof Part,
        private readonly s3Client: S3Client
    ) { }

    async uploadPublicFile(dataBuffer: Buffer, filename: string, fileType: string, partId: number) {
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
}
