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
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { APP_FILTER } from '@nestjs/core';
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
import { GoogleAuthModule } from "./auth/google/googleAuth.module";

@Module({
    controllers: [],
    providers: [
        //     {
        //     provide:APP_GUARD,
        //     useClass:JwtAuthGuard
        //  },
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        }
    ],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
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
            models: [User, Role, UserRoles,Brand,Car,Part,CarsParts, UserCars],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        BrandModule,
        CarModule,
        PartsModule,
        UserCarsModule,
        GoogleAuthModule,
    ]
})
export class AppModule { }