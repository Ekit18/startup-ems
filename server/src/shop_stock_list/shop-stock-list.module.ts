import { Part } from '../parts/parts.model';
import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { PartsModule } from 'src/parts/parts.module';
import { PartsShopModule } from 'src/parts_shop/parts-shop.module';
import { ShopStockListController } from './shop-stock-list.controller';
import { ShopStockList } from './shop-stock-list.model';
import { ShopStockListService } from './shop-stock-list.service';
import { PartsShop } from 'src/parts_shop/parts-shop.model';

@Module({
  controllers: [ShopStockListController],
  providers: [ShopStockListService],
  imports: [SequelizeModule.forFeature([ShopStockList, Part, PartsShop]), PartsShopModule, PartsModule,
  forwardRef(() => AuthModule),],
  exports: [ShopStockListService]
})
export class ShopStockListModule { }
