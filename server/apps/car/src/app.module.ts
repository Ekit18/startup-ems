import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { SequelizeModule } from "@nestjs/sequelize";
import { AllExceptionsFilter, User, Role, UserRoles, Brand, Car, CarOperation, CarServices, CarsParts, Crashes, Part, PartsGuidesAWS, PartsShop, RepairsHistory, ShopStockList, UserCars, RmqModule, RmqService } from "inq-shared-lib";
import { BrandModule } from "./brand/brand.module";
import { CarModule } from "./car/car.module";
import { UserCarsModule } from "./user-cars/user-cars.module";
import { BrandRmqController } from "./brand/brand-rmq.controller";
import { CardRmqController } from "./car/car-rmq.controller";
import { UserCarsRmqController } from "./user-cars/user-cars-rmq.controller";


@Module({
    controllers: [BrandRmqController, CardRmqController, UserCarsRmqController],
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
        BrandModule,
        CarModule,
        UserCarsModule,
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
