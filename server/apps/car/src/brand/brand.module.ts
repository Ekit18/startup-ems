import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "apps/auth/src/auth/auth.module";
import { Brand, JWTGuardRegisterModule } from "inq-shared-lib";
import { BrandController } from "./brand.controller";
import { BrandService } from "./brand.service";

@Module({
  providers: [BrandService],
  controllers: [BrandController],
  imports: [
    SequelizeModule.forFeature([Brand]),
    JWTGuardRegisterModule.register()
  ], exports: [
    BrandService
  ]
})
export class BrandModule { }
