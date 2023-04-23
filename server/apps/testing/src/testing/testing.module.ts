import { ConfigModule } from "@nestjs/config";
import { Module, forwardRef } from "@nestjs/common";
import { AUTH_QUEUE, RmqModule } from "inq-shared-lib";
import { TestingController } from "./testing.controller";
import { TestingService } from "./testing.service";


@Module({
    imports: [
        ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: ['.env']
    }),
        RmqModule.register({ name: AUTH_QUEUE }),
        forwardRef(() => TestingModule),
    ],
    controllers: [TestingController],
    providers: [TestingService],
})
export class TestingModule {
}
