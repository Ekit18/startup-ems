import { Part } from './../parts/parts.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PartsModule } from 'src/parts/parts.module';
import { PartsShopModule } from 'src/parts_shop/parts_shop.module';
import { ShopStockListController } from './shop_stock_list.controller';
import { ShopStockList } from './shop_stock_list.model';
import { ShopStockListService } from './shop_stock_list.service';
import { PartsShop } from 'src/parts_shop/parts_shop.model';

@Module({
  controllers: [ShopStockListController],
  providers: [ShopStockListService],
  imports: [SequelizeModule.forFeature([ShopStockList, Part, PartsShop]), PartsShopModule, PartsModule],
  exports: [ShopStockListService]
})
export class ShopStockListModule { }
