import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Part } from 'src/parts/parts.model';
import { PartsGuidesAwsController } from './parts-guides-aws.controller';
import { PartsGuidesAWS } from './parts-guides-aws.model';
import { PartsGuidesAwsService } from './parts-guides-aws.service';
import { PartsModule } from 'src/parts/parts.module';
import { S3Client } from '@aws-sdk/client-s3';

@Module({
  controllers: [PartsGuidesAwsController],
  providers: [PartsGuidesAwsService, {
    provide: S3Client,
    useFactory: (configService: ConfigService) =>
      new S3Client({
        region: configService.get<string>('AWS_REGION'),
        credentials: {
          accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
          secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY',),
        },
      }),
    inject: [ConfigService],
  }],
  imports: [SequelizeModule.forFeature([PartsGuidesAWS, Part]), ConfigModule, PartsModule]
})
export class PartsGuidesAwsModule { }
