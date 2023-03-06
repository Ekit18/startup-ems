import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common/decorators';
import { CreateUserCarsDto } from './dto/create-user-cars.dto';
import { GetAllUserCars } from './dto/get-all-user-cars.dto';
import { GetUserCar } from './dto/get-user-car.dto';
import { updateMileage } from './dto/update-mileage.dto';
import { UserCarsService } from './user-cars.service';

@Controller('user-cars')
export class UserCarsController {

    constructor(private userCarsService: UserCarsService) { }

    @Post()
    create(@Body() userCarsDto: CreateUserCarsDto) {
        return this.userCarsService.createUserCar(userCarsDto);
    }

    @Get('all-cars/:userId')
    getAllUserCarsById(@Param() params: GetAllUserCars) {
        return this.userCarsService.getAllUserCars(params);
    }

    @Get(':userId/cars/:carId')
    getUserCarById(@Param() params: GetUserCar) {
        return this.userCarsService.getUserCar(params);
    }

    @Put(':userId/cars/:carId')
    update(@Param() params: GetUserCar, @Body() mileageDto: updateMileage) {
        return this.userCarsService.updateMileage(params, mileageDto);
    }

    @Delete(':userId/cars/:carId')
    remove(@Param() params: GetUserCar) {
        return this.userCarsService.remove(params);
    }

}
