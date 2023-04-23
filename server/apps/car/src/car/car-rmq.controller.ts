import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { Part, RmqService } from "inq-shared-lib";
import { CarService } from './car.service';

@Controller()
export class CardRmqController {
    constructor(private carService: CarService, private readonly rmqService: RmqService) { }

    @MessagePattern({ role: "car", cmd: 'getCarById' })
    findOneByPartId(@Payload() carid: number, @Ctx() context: RmqContext) {
        this.rmqService.ack(context);
        console.log(carid);
        return this.carService.getCarById(carid);
    }
}
