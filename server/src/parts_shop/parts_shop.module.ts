import { Module } from '@nestjs/common';
import { PartsShopController } from './parts_shop.controller';
import { PartsShopService } from './parts_shop.service';

@Module({
  controllers: [PartsShopController],
  providers: [PartsShopService]
})
export class PartsShopModule {}
