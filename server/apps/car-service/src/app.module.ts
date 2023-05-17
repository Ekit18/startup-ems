import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { SequelizeModule } from "@nestjs/sequelize";
import { AllExceptionsFilter, User, Role, UserRoles, Brand, Car, CarOperation, CarServices, CarsParts, Crashes, Part, PartsGuidesAWS, PartsShop, RepairsHistory, ShopStockList, UserCars, RmqModule, RmqService } from "inq-shared-lib";
import { join } from "path";
import { CarOperationRmqController } from "./car-operation/car-operation-rmq.controller";
import { CarServicesRmqController } from "./car-service/car-service-rmq.controller";
import { CrashesRmqController } from "./crashes/crashes-rmq.controller";
import { RepairsHistoryRmqController } from "./repairs-history/repairs-history-rmq.controller";
import { CarOperationModule } from "./car-operation/car-operation.module";
import { CrashesModule } from "./crashes/crashes.module";
import { RepairsHistoryModule } from "./repairs-history/repairs-history.module";
import { CarServiceModule } from "./car-service/car-service.module";
import { RepairsHistorySearchModule } from "./repairs-history-search/repairs-history-search.module";


@Module({
    controllers: [CarOperationRmqController, CarServicesRmqController, CrashesRmqController, RepairsHistoryRmqController],
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
        CarOperationModule,
        CarServiceModule,
        CrashesModule,
        RepairsHistoryModule,
        RepairsHistorySearchModule
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
