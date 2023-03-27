import { HttpModule } from '@nestjs/axios/dist/http.module';
import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { BrandModule } from 'src/brand/brand.module';
import { BrandService } from 'src/brand/brand.service';
import { UserCars } from 'src/user-cars/user-cars.model';
import { CarController } from './car.controller';
import { Car } from './car.model';
import { CarService } from './car.service';

@Module({
  controllers: [CarController],
  providers: [CarService],
  imports: [HttpModule, BrandModule,
    SequelizeModule.forFeature([Car, UserCars]),
    forwardRef(() => AuthModule)
  ],
  exports: [CarService]
})
export class CarModule { }
