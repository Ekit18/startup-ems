import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { Part, RmqService, User } from "inq-shared-lib";
import { UsersService } from './users.service';

@Controller()
export class UsersRmqController {
    constructor(private usersService: UsersService, private readonly rmqService: RmqService) { }

    @MessagePattern({ role: "user", cmd: "findUserById" })
    findUserById(@Payload() userId: number, @Ctx() context: RmqContext): Promise<User> {
        this.rmqService.ack(context);
        console.log("TESTSTTTS");
        return this.usersService.getUserById(userId);
    }
}
