import { NestFactory } from "@nestjs/core";
import { RmqService, AWS_QUEUE } from "inq-shared-lib";
import { PartsGuidesAwsModule } from "./parts-guides-aws/parts-guides-aws.module";
async function bootstrap() {
  const app = await NestFactory.create(PartsGuidesAwsModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(AWS_QUEUE));
  app.enableCors();
  await app.startAllMicroservices();
  await app.listen(5001);
}
bootstrap();
