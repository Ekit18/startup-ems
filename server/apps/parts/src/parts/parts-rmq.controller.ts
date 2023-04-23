import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { PartsService } from "./parts.service";
import { Part, RmqService } from "inq-shared-lib";

@Controller()
export class PartsRMQController {
    constructor(private partService: PartsService, private readonly rmqService: RmqService) { }

    @MessagePattern({ role: "parts", cmd: "findOneById" })
    findOneById(@Payload() partId: number, @Ctx() context: RmqContext): Promise<Part> {
        this.rmqService.ack(context);
        console.log("TESTSTTTS");
        return this.partService.getPartById(partId);
    }
}
