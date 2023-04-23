import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "apps/auth/src/auth/auth.module";
import { CarOperation, JWTGuardRegisterModule } from "inq-shared-lib";
import { CarOperationController } from "./car-operation.controller";
import { CarOperationService } from "./car-operation.service";

@Module({
  controllers: [CarOperationController],
  providers: [CarOperationService],
  imports: [
    SequelizeModule.forFeature([CarOperation]),
    JWTGuardRegisterModule.register()
  ],
  exports: [
    CarOperationService
  ]
})
export class CarOperationModule { }
