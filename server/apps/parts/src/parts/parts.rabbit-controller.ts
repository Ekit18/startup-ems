import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { PartsService } from "./parts.service";
import { Part, RmqService } from "inq-shared-lib";

@Controller()
export class MathController {
    constructor(private partService: PartsService, private readonly rmqService: RmqService) { }

    @MessagePattern({ cmd: 'findOneByPartId' })
    findOneByPartId(@Payload() partId: number, @Ctx() context: RmqContext): Promise<Part> {
        this.rmqService.ack(context);
        return this.partService.getPartById(partId);
    }
}
