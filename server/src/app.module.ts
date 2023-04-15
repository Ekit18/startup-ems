import { PartsGuidesAWS } from 'src/parts-guides-aws/parts-guides-aws.model';
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from "./users/users.model";
import { UsersModule } from "./users/users.module";
import { RolesService } from './roles/roles.service';
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { AllExceptionsFilter } from "./filters/all-exceptions.filter";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join, resolve } from 'path';
import { BrandModule } from './brand/brand.module';
import { Brand } from "./brand/brand.model";
import { CarModule } from './car/car.module';
import { Car } from "./car/car.model";
import { PartsModule } from './parts/parts.module';
import { Part } from "./parts/parts.model";
import { CarsParts } from "./parts/cars-parts.model";
import { UserCarsModule } from './user-cars/user-cars.module';
import { UserCars } from "./user-cars/user-cars.model";
import { ShopStockListModule } from './shop_stock_list/shop-stock-list.module';
import { ShopStockList } from "./shop_stock_list/shop-stock-list.model";
import { PartsShop } from "./parts_shop/parts-shop.model";
import { PartsShopModule } from "./parts_shop/parts-shop.module";
import { GoogleAuthModule } from "./auth/google/googleAuth.module";
import { CarServiceModule } from "./car-service/car-service.module";
import { CarServices } from "./car-service/car-service.model";
import { CarOperationModule } from './car-operation/car-operation.module';
import { CarOperation } from "./car-operation/car-operation.model";
import { RepairsHistoryModule } from './repairs-history/repairs-history.module';
import { RepairsHistory } from "./repairs-history/repairs-history.model";
import { PartsGuidesAwsModule } from './parts-guides-aws/parts-guides-aws.module';
import { RolesGuard } from "./auth/roles.guard";
import { UserSignatureModule } from './user_signature/user_signature.module';
import { CrashesModule } from './crashes/crashes.module';
import { Crashes } from './crashes/crashes.model';
@Module({
    controllers: [],
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
    ],
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env']
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '/src/', 'static'),
        }),
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
        UsersModule,
        RolesModule,
        AuthModule,
        BrandModule,
        CarModule,
        PartsModule,
        UserCarsModule,
        ShopStockListModule,
        CarServiceModule,
        CarOperationModule,
        PartsShopModule,
        GoogleAuthModule,
        RepairsHistoryModule,
        RepairsHistoryModule,
        PartsGuidesAwsModule,
        UserSignatureModule,
        CrashesModule
    ]
})
export class AppModule { }
