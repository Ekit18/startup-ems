import { TestingModule } from "./testing.module";
import { NestFactory } from "@nestjs/core";
import { RmqService } from "inq-shared-lib";

async function bootstrap() {
    console.log(`TEST TEST${process.env.RABBIT_MQ_URI} asdasdas`);
    const app = await NestFactory.create(TestingModule);
    const rmqService = app.get<RmqService>(RmqService);
    app.connectMicroservice(rmqService.getOptions('TESTING'));
    await app.startAllMicroservices();
    await app.listen(5000, () => console.log(`Server started on port = ${5000}`));
}

bootstrap();
