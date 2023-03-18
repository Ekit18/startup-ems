import { CarModule } from './../car/car.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarsParts } from './cars-parts.model';
import { PartsController } from './parts.controller';
import { Part } from './parts.model';
import { PartsService } from './parts.service';
import { PartsShopModule } from 'src/parts_shop/parts_shop.module';
import { ShopStockList } from 'src/shop_stock_list/shop_stock_list.model';
import { PartsShop } from 'src/parts_shop/parts_shop.model';
import { forwardRef } from '@nestjs/common/utils';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PartsController],
  providers: [PartsService],
  imports: [SequelizeModule.forFeature([Part, CarsParts, ShopStockList, PartsShop]), CarModule, forwardRef(() => AuthModule)],
  exports: [PartsService]
})
export class PartsModule { }
