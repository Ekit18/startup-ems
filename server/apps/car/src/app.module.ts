import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {APP_GUARD} from "@nestjs/core";
import {RolesGuard} from "inq-shared-lib";
import {BrandRmqController} from "./brand/brand-rmq.controller";
import {CardRmqController} from "./car/car-rmq.controller";
import {UserCarsRmqController} from "./user-cars/user-cars-rmq.controller";


@Module({
    controllers: [BrandRmqController, CardRmqController, UserCarsRmqController],
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env'],
            isGlobal: true,
        })
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard
        },
    ],
})
export class AppModule { }
