import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { ServeStaticModule } from "@nestjs/serve-static";
import { AllExceptionsFilter } from "inq-shared-lib";
import { join } from "path";

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
    ]
})
export class CarServiceModule { }
