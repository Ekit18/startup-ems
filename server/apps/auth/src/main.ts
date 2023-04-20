import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RmqService, AUTH_QUEUE } from 'inq-shared-lib';

async function bootstrap() {
    console.log(`TEsTTEST ${process.env.POSTGRES_HOST}`);
    const app = await NestFactory.create(AppModule);
    const rmqService = app.get<RmqService>(RmqService);
    app.connectMicroservice(rmqService.getOptions(AUTH_QUEUE));
    app.enableCors();
    await app.startAllMicroservices();
    await app.listen(5000);
}

bootstrap();
