import { HttpModule } from "@nestjs/axios";
import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "apps/auth/src/auth/auth.module";
import { Car, UserCars, JWTGuardRegisterModule } from "inq-shared-lib";
import { BrandModule } from "../brand/brand.module";
import { CarController } from "./car.controller";
import { CarService } from "./car.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
  controllers: [CarController],
  providers: [CarService],
  imports: [HttpModule, BrandModule,
    SequelizeModule.forFeature([Car, UserCars]),
    JWTGuardRegisterModule.register()
  ],
  exports: [CarService]
})
export class CarModule { }
