import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PartsController } from './parts.controller';
import { Part } from './parts.model';
import { PartsService } from './parts.service';

@Module({
  controllers: [PartsController],
  providers: [PartsService],
  imports:[SequelizeModule.forFeature([Part])]
})
export class PartsModule {}
