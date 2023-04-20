import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { RmqModule } from "inq-shared-lib";
import { TestingController } from "./testing.controller";
import { TestingService } from "./testing.service";


@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: ['.env']
    }),
        RmqModule],
    controllers: [TestingController],
    providers: [TestingService],
})
export class TestingModule {
}
