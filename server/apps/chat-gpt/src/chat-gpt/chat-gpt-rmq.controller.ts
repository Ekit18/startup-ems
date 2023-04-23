import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { Part, RmqService } from "inq-shared-lib";
import { ChatGptService } from './chat-gpt.service';

@Controller()
export class ChatGptRmqController {
    constructor(private chatGptControllerService: ChatGptService, private readonly rmqService: RmqService) { }

    // @MessagePattern({ role: "auth", cmd: 'test' })
    // findOneByPartId(@Payload() data: number, @Ctx() context: RmqContext) {
    //     this.rmqService.ack(context);
    //     console.log(data);
    //     return this.authService.test(data);
    // }
}
