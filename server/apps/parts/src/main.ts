import { NestFactory, HttpAdapterHost } from "@nestjs/core";
import { RmqService, PARTS_QUEUE, ValidationPipe, AllExceptionsFilter } from "inq-shared-lib";
import { AppModule } from "./app.module";

async function bootstrap() {
  const PORT = process.env.PORT || 5005;
  const app = await NestFactory.create(AppModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.connectMicroservice(rmqService.getOptions(PARTS_QUEUE));
  await app.startAllMicroservices();
  await app.listen(PORT, () => console.log(`Started PARTS server on port ${PORT}...🚀🌟 `));
}

bootstrap();
