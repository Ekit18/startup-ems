import { S3Client } from "@aws-sdk/client-s3";
import { Module, forwardRef } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { PartsGuidesAWS, Part, RmqModule, PARTS_QUEUE } from "inq-shared-lib";
import { PartsGuidesAwsController } from "./parts-guides-aws.controller";
import { PartsGuidesAwsService } from "./parts-guides-aws.service";
import { AuthModule } from "apps/auth/src/auth/auth.module";

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
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([PartsGuidesAWS]),
    RmqModule.register({ name: PARTS_QUEUE }) // Register client to send msgs to Parts MCService
  ],
  exports: [
    PartsGuidesAwsService
  ]
})
export class PartsGuidesAwsModule { }
