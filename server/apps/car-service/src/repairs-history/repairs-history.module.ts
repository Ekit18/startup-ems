import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "apps/auth/src/auth/auth.module";
import { RepairsHistory, JWTGuardRegisterModule, CAR_QUEUE, RmqModule } from "inq-shared-lib";
import { CarOperationModule } from "../car-operation/car-operation.module";
import { RepairsHistoryController } from "./repairs-history.controller";
import { RepairsHistoryGateway } from "./repairs-history.gateway";
import { RepairsHistoryService } from "./repairs-history.service";
import { CarServiceModule } from "../car-service/car-service.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [RepairsHistoryController],
  providers: [RepairsHistoryService, RepairsHistoryGateway],
  imports: [
    SequelizeModule.forFeature([RepairsHistory]), CarServiceModule, CarOperationModule,
    JWTGuardRegisterModule.register(),
    RmqModule.register({ name: CAR_QUEUE })
  ],
  exports: [
    RepairsHistoryService
  ]
})
export class RepairsHistoryModule {}
