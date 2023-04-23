import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "apps/auth/src/auth/auth.module";
import { ShopStockList, Part, PartsShop, JWTGuardRegisterModule } from "inq-shared-lib";
import { PartsModule } from "../parts/parts.module";
import { PartsShopModule } from "../parts-shop/parts-shop.module";
import { ShopStockListController } from "./shop-stock-list.controller";
import { ShopStockListService } from "./shop-stock-list.service";

@Module({
  controllers: [ShopStockListController],
  providers: [ShopStockListService],
  imports: [SequelizeModule.forFeature([ShopStockList, Part, PartsShop]), PartsShopModule, PartsModule,
  JWTGuardRegisterModule.register()],
  exports: [ShopStockListService]
})
export class ShopStockListModule { }
