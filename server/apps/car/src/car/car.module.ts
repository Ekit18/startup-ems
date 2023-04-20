import { HttpModule } from "@nestjs/axios";
import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "apps/auth/src/auth/auth.module";
import { Car, UserCars } from "inq-shared-lib";
import { BrandModule } from "../brand/brand.module";
import { CarController } from "./car.controller";
import { CarService } from "./car.service";

@Module({
  controllers: [CarController],
  providers: [CarService],
  imports: [HttpModule, BrandModule,
    SequelizeModule.forFeature([Car, UserCars]),
    forwardRef(() => AuthModule)
  ],
  exports: [CarService]
})
export class CarModule { }
