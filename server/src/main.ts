import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { AllExceptionsFilter } from "./filters/all-exceptions.filter";
import { ValidationPipe } from "./pipes/validation.pipe";

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe())
    const httpAdapter = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}

start()