import { NestFactory, HttpAdapterHost } from "@nestjs/core";
import { RmqService, CHAT_GPT_QUEUE, ValidationPipe, AllExceptionsFilter } from "inq-shared-lib";
import { AppModule } from "./app.module";

async function bootstrap() {
  const PORT = process.env.PORT || 5004;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const httpAdapter = app.get(HttpAdapterHost);
  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(CHAT_GPT_QUEUE));
  await app.startAllMicroservices();
  await app.listen(PORT, () => console.log(`Started CHAT-GPT server on port ${PORT}...🚀🌟 `));
}
bootstrap();
