import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { CarCreationAttrs, Part, RmqService, User, UserCars, UserCarsCreationAttrs } from "inq-shared-lib";
import { UserCarsService } from './user-cars.service';

export interface UserCarsData extends Omit<CarCreationAttrs, 'brandId'>, Pick<UserCarsCreationAttrs, 'carMileage'> {
    // Without those extensions, it would be boilerplate/hard-code
    id: number; // id of row in cars
    brand: string; // will be got from compound request
}

export interface UserCarsDataWithUserCarId extends UserCarsData {
    userCarId: typeof UserCars.prototype.id;
    user: typeof User.prototype.email;
}

@Controller()
export class UserCarsRmqController {
    constructor(private userCars: UserCarsService, private readonly rmqService: RmqService) { }

    @MessagePattern({ role: "user-cars", cmd: "findAllUserCars" })
    findAllUserCars(@Payload() userId: number, @Ctx() context: RmqContext): Promise<UserCarsDataWithUserCarId[]> {
        this.rmqService.ack(context);
        console.log("TESTSTTTS");
        return this.userCars.getAllUserCarsWithEmail(userId);
    }

    @MessagePattern({ role: "user-cars", cmd: "getUserCarForCrashInfo" })
    findUserCarForCrashInfo(@Payload() userCarId: number, @Ctx() context: RmqContext): Promise<UserCarsDataWithUserCarId> {
        this.rmqService.ack(context);
        console.log("TESTSTTTS");
        return this.userCars.getUserCarForCrashInfo(userCarId);
    }
}
