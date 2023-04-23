import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { Part, RmqService, UserCars } from "inq-shared-lib";

@Controller()
export class UserCarsRmqController {
    constructor(private userCars: UserCars, private readonly rmqService: RmqService) { }

    // @MessagePattern({ role: "auth", cmd: 'test' })
    // findOneByPartId(@Payload() data: number, @Ctx() context: RmqContext) {
    //     this.rmqService.ack(context);
    //     console.log(data);
    //     return this.authService.test(data);
    // }
}
