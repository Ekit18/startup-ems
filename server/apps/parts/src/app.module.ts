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
import { PartsModule } from "./parts/parts.module";
import { PartsShopModule } from "./parts_shop/parts-shop.module";
import { ShopStockListModule } from "./shop_stock_list/shop-stock-list.module";
import { PartsGuidesAwsModule } from "../../aws/src/parts-guides-aws/parts-guides-aws.module";
import { ClientsModule } from "@nestjs/microservices";

@Module({
    controllers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env']
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
            models: [Part, ShopStockList, PartsShop, Car, PartsGuidesAWS, CarsParts],
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
