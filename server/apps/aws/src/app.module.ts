import {Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {RmqService} from "inq-shared-lib";
import {PartsGuidesAwsRmqController} from "./parts-guides-aws/parts-guides-aws-rmq.controller";

@Module({
    controllers: [PartsGuidesAwsRmqController],
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env'],
            isGlobal: true,
        }),
    ],
    providers: [
        {
            provide: RmqService,
            useFactory: (configService: ConfigService) => {
                return new RmqService(configService);
            },
            inject: [ConfigService],
        },
    ],
})
export class AppModule { }
