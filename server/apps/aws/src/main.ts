import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { RmqService, AWS_QUEUE, ValidationPipe, AllExceptionsFilter } from "inq-shared-lib";
import { AppModule } from "./app.module";
async function bootstrap() {
  const PORT = process.env.PORT || 5001;
  const app = await NestFactory.create(AppModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(AWS_QUEUE));
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  await app.startAllMicroservices();
  await app.listen(PORT, () => console.log(`Started AWS server on port ${PORT}...🚀🌟 `));
}
bootstrap();
