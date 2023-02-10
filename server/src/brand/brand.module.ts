import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from './brand.model';

@Module({
  providers: [BrandService],
  controllers: [BrandController],
  imports: [
    SequelizeModule.forFeature([Brand])
  ]
})
export class BrandModule {}
