import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "apps/auth/src/auth/auth.module";
import { UserCarsModule } from "apps/car/src/user-cars/user-cars.module";
import { Crashes, RmqModule } from "inq-shared-lib";
import { CrashesController } from "./crashes.controller";
import { RepairsHistoryGateway } from "./crashes.gateway";
import { CrashesService } from "./crashes.service";

@Module({
  controllers: [CrashesController],
  providers: [CrashesService, RepairsHistoryGateway],
  imports: [
    SequelizeModule.forFeature([Crashes]), UserCarsModule,
    forwardRef(() => AuthModule),
    RmqModule.register({ name: 'car' }),
  ]
})
export class CrashesModule {}
