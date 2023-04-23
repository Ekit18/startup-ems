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
import { PartsModule } from "./parts/parts.module";
import { PartsShopModule } from "./parts-shop/parts-shop.module";
import { ShopStockListModule } from "./shop-stock-list/shop-stock-list.module";
import { PartsRMQController } from "./parts/parts-rmq.controller";
import { PartsShopRMQController } from "./parts-shop/parts-shop-rmq.controller";
import { ShopStockListRMQController } from "./shop-stock-list/shop-stock-list-rmq.controller";

@Module({
    controllers: [PartsRMQController, PartsShopRMQController, ShopStockListRMQController],
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
            models: [User, Role, UserRoles, Car, Part, CarsParts, UserCars, ShopStockList, PartsShop, CarOperation, PartsGuidesAWS, RepairsHistory, Crashes],
            autoLoadModels: true,
            // dialectOptions: {
            //     ssl: {
            //         require: true,
            //         rejectUnauthorized: false,
            //     }
            // }
        }),
        PartsModule,
        PartsShopModule,
        ShopStockListModule,
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
