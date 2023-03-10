import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PartsModule } from 'src/parts/parts.module';
import { ShopStockList } from 'src/shop_stock_list/shop_stock_list.model';
import { PartsShopController } from './parts_shop.controller';
import { PartsShop } from './parts_shop.model';
import { PartsShopService } from './parts_shop.service';

@Module({
  controllers: [PartsShopController],
  providers: [PartsShopService],
  imports: [SequelizeModule.forFeature([PartsShop, ShopStockList])]
})
export class PartsShopModule {}
