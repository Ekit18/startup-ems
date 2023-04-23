import { NestFactory } from "@nestjs/core";
import { RmqService } from "inq-shared-lib";
import { ChatGptModule } from "./chat-gpt/chat-gpt.module";

async function bootstrap() {
  const PORT = process.env.PORT || 5004;
  const app = await NestFactory.create(ChatGptModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions("chat-gpt"));
  await app.startAllMicroservices();
  await app.listen(PORT, () => console.log(`Started CHAT-GPT server on port ${PORT}...🚀🌟 `));
}
bootstrap();
