import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { DocumentBuilder } from "@nestjs/swagger";
import { SwaggerModule } from "@nestjs/swagger/dist";
import { AppModule } from "./app.module";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { AllExceptionsFilter } from "./filters/all-exceptions.filter";
import { ValidationPipe } from "./pipes/validation.pipe";

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder().setTitle('AI Car Mechanic').setDescription("AI Car Mechanic API Docs").setVersion("1.0.0").addTag("AI Startup").build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("/api/docs", app, document)

    app.enableCors();
    app.useGlobalPipes(new ValidationPipe())
    const httpAdapter = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}

start()