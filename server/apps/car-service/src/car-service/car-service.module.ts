import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "apps/auth/src/auth/auth.module";
import { CarServices } from "inq-shared-lib";
import { CarServicesController } from "./car-service.controller";
import { CarServicesServices } from "./car-service.service";

@Module({
  controllers: [CarServicesController],
  providers: [CarServicesServices],
  imports: [
    SequelizeModule.forFeature([CarServices]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    CarServicesServices
  ]
})
export class CarServiceModule { }
