import { Module } from "@nestjs/common";
import { ChatGptController } from "./chat-gpt.controller";
import { ChatGptService } from "./chat-gpt.service";
import { CAR_QUEUE, JWTGuardRegisterModule, RmqModule } from "inq-shared-lib";

@Module({
  controllers: [ChatGptController],
  providers: [ChatGptService],
  imports: [
    JWTGuardRegisterModule.register(),
    RmqModule.register({ name: CAR_QUEUE })
  ],
  exports: [
    ChatGptService
  ]
})
export class ChatGptModule {}
