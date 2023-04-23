import { NestFactory } from "@nestjs/core";
import { RmqService } from "inq-shared-lib";
import { AppModule } from "./app.module";

async function bootstrap() {
  const PORT = process.env.PORT || 5003;
  const app = await NestFactory.create(AppModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('car-service'));
  await app.startAllMicroservices();
  await app.listen(5003);
  await app.listen(PORT, () => console.log(`Started CAR-SERVICE server on port ${PORT}...🚀🌟 `));
}
bootstrap();
