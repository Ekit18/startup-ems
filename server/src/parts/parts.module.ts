import { CarModule } from './../car/car.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarsParts } from './cars-parts.model';
import { PartsController } from './parts.controller';
import { Part } from './parts.model';
import { PartsService } from './parts.service';

@Module({
  controllers: [PartsController],
  providers: [PartsService],
  imports:[SequelizeModule.forFeature([Part,CarsParts]),CarModule]
})
export class PartsModule {}
