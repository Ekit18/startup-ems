import { NestFactory } from "@nestjs/core";
import { RmqService, AWS_QUEUE } from "inq-shared-lib";
import { PartsGuidesAwsModule } from "./parts-guides-aws/parts-guides-aws.module";
import { AppModule } from "./app.module";
async function bootstrap() {
  const PORT = process.env.PORT || 5001;
  const app = await NestFactory.create(AppModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(AWS_QUEUE));
  app.enableCors();
  await app.startAllMicroservices();
  await app.listen(PORT, () => console.log(`Started AWS server on port ${PORT}...🚀🌟 `));
}
bootstrap();
