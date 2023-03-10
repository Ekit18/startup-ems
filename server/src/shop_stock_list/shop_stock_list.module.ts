import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { PartsModule } from 'src/parts/parts.module';
import { PartsShopModule } from 'src/parts_shop/parts_shop.module';
import { ShopStockListController } from './shop_stock_list.controller';
import { ShopStockList } from './shop_stock_list.model';
import { ShopStockListService } from './shop_stock_list.service';

@Module({
  controllers: [ShopStockListController],
  providers: [ShopStockListService],
  imports: [SequelizeModule.forFeature([ShopStockList]), PartsShopModule, PartsModule,
  forwardRef(() => AuthModule),],
  exports: [ShopStockListService]
})
export class ShopStockListModule { }
