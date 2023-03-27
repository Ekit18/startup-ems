import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { PartsModule } from 'src/parts/parts.module';
import { ShopStockList } from 'src/shop_stock_list/shop-stock-list.model';
import { PartsShopController } from './parts-shop.controller';
import { PartsShop } from './parts-shop.model';
import { PartsShopService } from './parts-shop.service';

@Module({
  controllers: [PartsShopController],
  providers: [PartsShopService],
  imports: [SequelizeModule.forFeature([PartsShop, ShopStockList]),
  forwardRef(() => AuthModule), HttpModule]
})
export class PartsShopModule { }
