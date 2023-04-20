import { NestFactory } from "@nestjs/core";
import { RmqService } from "inq-shared-lib";
import { CarModule } from "./car/car.module";

async function bootstrap() {
  const app = await NestFactory.create(CarModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('BILLING'));
  await app.startAllMicroservices();
}
bootstrap();
