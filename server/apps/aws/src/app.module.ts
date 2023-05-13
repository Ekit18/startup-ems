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
    CarsParts,
    CarOperation,
    UserCars,
    User,
    RepairsHistory,
    Crashes,
    UserRoles,
    Brand,
    CarServices,
    Role
} from "inq-shared-lib";
import { PartsGuidesAwsModule } from "../../aws/src/parts-guides-aws/parts-guides-aws.module";
import { PartsGuidesAwsRmqController } from "./parts-guides-aws/parts-guides-aws-rmq.controller";

@Module({
    controllers: [PartsGuidesAwsRmqController],
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env'],
            isGlobal: true,
        }),
        // ServeStaticModule.forRoot({
        //     rootPath: join(__dirname, '..', '/src/', 'static'),
        // }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles, Brand, Car, Part, CarsParts, UserCars, ShopStockList, PartsShop, CarServices, CarOperation, PartsGuidesAWS, RepairsHistory, Crashes],
            autoLoadModels: true,
            // dialectOptions: {
            //     ssl: {
            //         require: true,
            //         rejectUnauthorized: false,
            //     }
            // }
        }),
        PartsGuidesAwsModule
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
