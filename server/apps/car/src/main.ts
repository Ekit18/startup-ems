import { NestFactory, HttpAdapterHost } from "@nestjs/core";
import { RmqService, CAR_QUEUE, ValidationPipe, AllExceptionsFilter } from "inq-shared-lib";
import { AppModule } from "./app.module";

async function bootstrap() {
  const PORT = process.env.PORT || 5002;
  const app = await NestFactory.create(AppModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.useGlobalPipes(new ValidationPipe());
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.connectMicroservice(rmqService.getOptions(CAR_QUEUE));
  await app.startAllMicroservices();
  await app.listen(PORT, () => console.log(`Started CAR server on port ${PORT}...🚀🌟 `));
}
bootstrap();
