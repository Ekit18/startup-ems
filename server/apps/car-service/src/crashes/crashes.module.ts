import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CAR_QUEUE, Crashes, JWTGuardRegisterModule, RmqModule } from "inq-shared-lib";
import { CrashesController } from "./crashes.controller";
import { RepairsHistoryGateway } from "./crashes.gateway";
import { CrashesService } from "./crashes.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [CrashesController],
  providers: [CrashesService, RepairsHistoryGateway],
  imports: [
    SequelizeModule.forFeature([Crashes]),
    RmqModule.register({ name: CAR_QUEUE }),
    JWTGuardRegisterModule.register()
  ],
  exports: [
    CrashesService
  ]
})
export class CrashesModule {}
