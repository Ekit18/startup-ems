import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RmqService, AUTH_QUEUE } from 'inq-shared-lib';

async function bootstrap() {
    console.log(`TEsTTEST ${process.env.POSTGRES_HOST}`);
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    const rmqService = app.get<RmqService>(RmqService);
    app.connectMicroservice(rmqService.getOptions(AUTH_QUEUE));
    app.enableCors();
    await app.startAllMicroservices();
    await app.listen(PORT, () => console.log(`Started AUTH server on port ${PORT}...🚀🌟 `));
}

bootstrap();
