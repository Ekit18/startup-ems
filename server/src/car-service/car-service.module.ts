import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { CarServicesController } from './car-service.controller';
import { CarServices } from './car-service.model';
import { CarServicesServices } from './car-service.service';

@Module({
  controllers: [CarServicesController],
  providers: [CarServicesServices],
  imports: [
    SequelizeModule.forFeature([CarServices]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    CarServicesServices
  ]
})
export class CarServiceModule { }
