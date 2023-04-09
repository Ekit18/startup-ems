import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { CarModule } from 'src/car/car.module';
import { UsersModule } from 'src/users/users.module';
import { UserCarsController } from './user-cars.controller';
import { UserCars } from './user-cars.model';
import { UserCarsService } from './user-cars.service';
import { BrandModule } from 'src/brand/brand.module';

@Module({
  controllers: [UserCarsController],
  providers: [UserCarsService],
  imports: [
    SequelizeModule.forFeature([UserCars]), CarModule, UsersModule, BrandModule,
    forwardRef(() => AuthModule),
  ],
  exports: [
    UserCarsService
  ]
})
export class UserCarsModule { }
