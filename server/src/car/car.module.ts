import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserCars } from 'src/user-cars/user-cars.model';
import { CarController } from './car.controller';
import { Car } from './car.model';
import { CarService } from './car.service';

@Module({
  controllers: [CarController],
  providers: [CarService],
  imports: [
    SequelizeModule.forFeature([Car, UserCars])
  ],
  exports:[CarService]
})
export class CarModule {}
