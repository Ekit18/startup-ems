import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { CarOperationController } from './car-operation.controller';
import { CarOperation } from './car-operation.model';
import { CarOperationService } from './car-operation.service';

@Module({
  controllers: [CarOperationController],
  providers: [CarOperationService],
  imports: [
    SequelizeModule.forFeature([CarOperation]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    CarOperationService
  ]
})
export class CarOperationModule { }
