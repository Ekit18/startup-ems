import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { Part, RmqService } from "inq-shared-lib";
import { PartsShopService } from './parts-shop.service';

@Controller()
export class PartsShopRMQController {
    constructor(private partsShopService: PartsShopService, private readonly rmqService: RmqService) { }

    // @MessagePattern({ cmd: 'findOneByPartId' })
    // findOneByPartId(@Payload() partId: number, @Ctx() context: RmqContext): Promise<Part> {
    //     this.rmqService.ack(context);
    //     console.log("TESTSTTTS");
    //     return this.partService.getPartById(partId);
    // }
}
