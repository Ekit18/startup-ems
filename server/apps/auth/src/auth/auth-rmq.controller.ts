import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { Part, RmqService } from "inq-shared-lib";
import { AuthService } from './auth.service';

@Controller()
export class AuthRmqController {
    constructor(private authService: AuthService, private readonly rmqService: RmqService) { }

    @MessagePattern({ role: "auth", cmd: 'test' })
    findOneByPartId(@Payload() data: number, @Ctx() context: RmqContext) {
        this.rmqService.ack(context);
        console.log(data);
        return this.authService.test(data);
    }
}
