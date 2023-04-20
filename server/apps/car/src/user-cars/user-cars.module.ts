import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "apps/auth/src/auth/auth.module";
import { UsersModule } from "apps/auth/src/users/users.module";
import { UserCars } from "inq-shared-lib";
import { BrandModule } from "../brand/brand.module";
import { CarModule } from "../car/car.module";
import { UserCarsController } from "./user-cars.controller";
import { UserCarsService } from "./user-cars.service";

@Module({
  controllers: [UserCarsController],
  providers: [UserCarsService],
  imports: [
    SequelizeModule.forFeature([UserCars]), CarModule, UsersModule, BrandModule,
    forwardRef(() => AuthModule),
  ],
  exports: [
    UserCarsService
  ]
})
export class UserCarsModule { }
