import { Module } from '@nestjs/common';
import { ChatGptController } from './chat_gpt.controller';
import { ChatGptService } from './chat_gpt.service';

@Module({
  controllers: [ChatGptController],
  providers: [ChatGptService]
})
export class ChatGptModule {}
