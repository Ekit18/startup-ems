import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { SequelizeModule } from "@nestjs/sequelize";
import {
    AllExceptionsFilter,
    Car,
    Part,
    PartsShop,
    ShopStockList,
    RmqService,
    PartsGuidesAWS,
    CarsParts
} from "inq-shared-lib";
import { ClientsModule } from "@nestjs/microservices";
import { TestingController } from "./testing/testing.controller";
import { TestingModule } from "./testing/testing.module";

@Module({
    controllers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env']
        }),
        // ServeStaticModule.forRoot({
        //     rootPath: join(__dirname, '..', '/src/', 'static'),
        // }),

        TestingModule
    ],
    providers: [
        // {
        //     provide: APP_GUARD,
        //     useClass: JwtAuthGuard
        // },
        // {
        //     provide: APP_GUARD,
        //     useClass: RolesGuard
        //  },
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
        {
            provide: RmqService,
            useFactory: (configService: ConfigService) => {
                console.log(`POSTGRES:::::::${process.env.POSTGRES_HOST}`);
                return new RmqService(configService);
            },
            inject: [ConfigService],
        },
    ],
})
export class AppModule { }
