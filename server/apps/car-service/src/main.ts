import { NestFactory, HttpAdapterHost } from "@nestjs/core";
import { CAR_SERVICE_QUEUE, RmqService, ValidationPipe, AllExceptionsFilter } from "inq-shared-lib";
import { AppModule } from "./app.module";

async function bootstrap() {
  const PORT = process.env.PORT || 5003;
  const app = await NestFactory.create(AppModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(CAR_SERVICE_QUEUE));
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  await app.startAllMicroservices();
  await app.listen(PORT, () => console.log(`Started CAR-SERVICE server on port ${PORT}...🚀🌟 `));
}
bootstrap();
