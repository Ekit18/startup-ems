import { HttpModule } from "@nestjs/axios";
import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "apps/auth/src/auth/auth.module";
import { PartsShop, ShopStockList, JWTGuardRegisterModule } from "inq-shared-lib";
import { PartsShopController } from "./parts-shop.controller";
import { PartsShopService } from "./parts-shop.service";

@Module({
  controllers: [PartsShopController],
  providers: [PartsShopService],
  imports: [SequelizeModule.forFeature([PartsShop, ShopStockList]), HttpModule,
  JWTGuardRegisterModule.register()],
  exports: [PartsShopService]
})
export class PartsShopModule { }
