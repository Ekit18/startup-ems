import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarServicesController } from './car-service.controller';
import { CarServices } from './car-service.model';
import { CarServicesServices } from './car-service.service';

@Module({
  controllers: [CarServicesController],
  providers: [CarServicesServices],
  imports: [
    SequelizeModule.forFeature([CarServices])
  ]
})
export class CarServiceModule {}
