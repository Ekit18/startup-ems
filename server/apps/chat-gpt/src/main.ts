import { NestFactory } from "@nestjs/core";
import { RmqService } from "inq-shared-lib";
import { ChatGptModule } from "./chat_gpt/chat_gpt.module";

async function bootstrap() {
  const app = await NestFactory.create(ChatGptModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('BILLING'));
  await app.startAllMicroservices();
}
bootstrap();
