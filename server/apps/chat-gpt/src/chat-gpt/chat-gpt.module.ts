import { Module } from "@nestjs/common";
import { ChatGptController } from "./chat-gpt.controller";
import { ChatGptService } from "./chat-gpt.service";
import { JWTGuardRegisterModule } from "inq-shared-lib";

@Module({
  controllers: [ChatGptController],
  providers: [ChatGptService],
  imports: [
    JWTGuardRegisterModule.register()
  ],
  exports: [
    ChatGptService
  ]
})
export class ChatGptModule {}
