import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarOperationModule } from 'src/car-operation/car-operation.module';
import { CarServiceModule } from 'src/car-service/car-service.module';
import { RepairsHistoryController } from './repairs-history.controller';
import { RepairsHistory } from './repairs-history.model';
import { RepairsHistoryService } from './repairs-history.service';

@Module({
  controllers: [RepairsHistoryController],
  providers: [RepairsHistoryService],
  imports: [
    SequelizeModule.forFeature([RepairsHistory]), CarServiceModule, CarOperationModule
  ]
})
export class RepairsHistoryModule {}
