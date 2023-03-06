import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserCarsDto } from './dto/create-user-cars.dto';
import { GetAllUserCars } from './dto/get-all-user-cars.dto';
import { GetUserCar } from './dto/get-user-car.dto';
import { updateMileage } from './dto/update-mileage.dto';
import { UserCars } from './user-cars.model';
import { UserCarsService } from './user-cars.service';

@ApiTags("User cars")
@Controller('user-cars')
export class UserCarsController {

    constructor(private userCarsService: UserCarsService) { }

    @ApiOperation({ summary: "Creating user car" })
    @ApiResponse({ status: 200, type: UserCars })
    @Post()
    create(@Body() userCarsDto: CreateUserCarsDto) {
        return this.userCarsService.createUserCar(userCarsDto);
    }

    @ApiOperation({ summary: "Getting all user cars" })
    @ApiResponse({ status: 200, type: [UserCars] })
    @Get('all-cars/:userId')
    getAllUserCarsById(@Param() params: GetAllUserCars) {
        return this.userCarsService.getAllUserCars(params);
    }

    @ApiOperation({ summary: "Getting user car" })
    @ApiResponse({ status: 200, type: UserCars })
    @Get(':userId/cars/:carId')
    getUserCarById(@Param() params: GetUserCar) {
        return this.userCarsService.getUserCar(params);
    }

    @ApiOperation({ summary: "Changing mileage" })
    @ApiResponse({ status: 200, type: Number })
    @Put(':userId/cars/:carId')
    update(@Param() params: GetUserCar, @Body() mileageDto: updateMileage) {
        return this.userCarsService.updateMileage(params, mileageDto);
    }

    @ApiOperation({ summary: "Deleting user car" })
    @ApiResponse({ status: 200, type: Number })
    @Delete(':userId/cars/:carId')
    remove(@Param() params: GetUserCar) {
        return this.userCarsService.remove(params);
    }

}
