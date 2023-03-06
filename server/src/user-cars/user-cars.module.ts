import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserCarsController } from './user-cars.controller';
import { UserCars } from './user-cars.model';
import { UserCarsService } from './user-cars.service';

@Module({
  controllers: [UserCarsController],
  providers: [UserCarsService],
  imports:[
    SequelizeModule.forFeature([UserCars])
  ]
})
export class UserCarsModule {}
