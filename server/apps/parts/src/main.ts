import { NestFactory } from "@nestjs/core";
import { RmqService, PARTS_QUEUE } from "inq-shared-lib";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(PARTS_QUEUE));
  app.enableCors();
  await app.startAllMicroservices();
}

bootstrap();
