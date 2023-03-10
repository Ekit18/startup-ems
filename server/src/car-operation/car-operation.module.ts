import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarOperationController } from './car-operation.controller';
import { CarOperation } from './car-operation.model';
import { CarOperationService } from './car-operation.service';

@Module({
  controllers: [CarOperationController],
  providers: [CarOperationService],
  imports: [
    SequelizeModule.forFeature([CarOperation])
  ],
  exports: [
    CarOperationService
  ]
})
export class CarOperationModule { }
