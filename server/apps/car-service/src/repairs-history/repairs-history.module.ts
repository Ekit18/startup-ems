import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "apps/auth/src/auth/auth.module";
import { RepairsHistory } from "inq-shared-lib";
import { CarServiceModule } from "../app.module";
import { CarOperationModule } from "../car-operation/car-operation.module";
import { RepairsHistoryController } from "./repairs-history.controller";
import { RepairsHistoryGateway } from "./repairs-history.gateway";
import { RepairsHistoryService } from "./repairs-history.service";

@Module({
  controllers: [RepairsHistoryController],
  providers: [RepairsHistoryService, RepairsHistoryGateway],
  imports: [
    SequelizeModule.forFeature([RepairsHistory]), CarServiceModule, CarOperationModule,
    forwardRef(() => AuthModule),
  ]
})
export class RepairsHistoryModule {}
