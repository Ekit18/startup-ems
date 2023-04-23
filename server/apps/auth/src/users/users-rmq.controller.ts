import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { Part, RmqService } from "inq-shared-lib";
import { UsersService } from './users.service';

@Controller()
export class UsersRmqController {
    constructor(private usersService: UsersService, private readonly rmqService: RmqService) { }

    // @MessagePattern({ cmd: 'test' })
    // findOneByPartId(@Payload() data: number, @Ctx() context: RmqContext) {
    //     this.rmqService.ack(context);
    //     console.log(data);
    //     return this.authService.test(data);
    // }
}
