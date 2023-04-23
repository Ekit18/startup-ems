import { NestFactory } from "@nestjs/core";
import { RmqService } from "inq-shared-lib";
import { AppModule } from "./app.module";

async function bootstrap() {
    console.log(`TEST TEST${process.env.RABBIT_MQ_URI} asdasdas`);
    const app = await NestFactory.create(AppModule);
    const rmqService = app.get<RmqService>(RmqService);
    app.connectMicroservice(rmqService.getOptions('TESTING'));
    await app.startAllMicroservices();
    await app.listen(5020, () => console.log(`Server started on port = ${5020}`));
}

bootstrap();
