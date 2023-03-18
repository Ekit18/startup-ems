import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarModule } from 'src/car/car.module';
import { UsersModule } from 'src/users/users.module';
import { UserCarsController } from './user-cars.controller';
import { UserCars } from './user-cars.model';
import { UserCarsService } from './user-cars.service';

@Module({
  controllers: [UserCarsController],
  providers: [UserCarsService],
  imports: [
    SequelizeModule.forFeature([UserCars]), CarModule, UsersModule
  ],
  exports: [
    UserCarsService
  ]
})
export class UserCarsModule { }
