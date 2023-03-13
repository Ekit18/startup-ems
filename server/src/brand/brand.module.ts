import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from './brand.model';
import { forwardRef } from '@nestjs/common/utils';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [BrandService],
  controllers: [BrandController],
  imports: [
    SequelizeModule.forFeature([Brand]),
    forwardRef(() => AuthModule)
  ]
})
export class BrandModule {}
