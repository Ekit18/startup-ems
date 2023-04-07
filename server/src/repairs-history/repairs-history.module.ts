import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { CarOperationModule } from 'src/car-operation/car-operation.module';
import { CarServiceModule } from 'src/car-service/car-service.module';
import { RepairsHistoryController } from './repairs-history.controller';
import { RepairsHistory } from './repairs-history.model';
import { RepairsHistoryService } from './repairs-history.service';
import { RepairsHistoryGateway } from './repairs-history.gateway';

@Module({
  controllers: [RepairsHistoryController],
  providers: [RepairsHistoryService, RepairsHistoryGateway],
  imports: [
    SequelizeModule.forFeature([RepairsHistory]), CarServiceModule, CarOperationModule,
    forwardRef(() => AuthModule),
  ]
})
export class RepairsHistoryModule {}
