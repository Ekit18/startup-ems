import { Controller, UseGuards, Post, Body, Get, Param, Put, Delete } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UserCars, JwtAuthGuard, CreateUserCarsDto, GetUserCar, updateMileage } from "inq-shared-lib";
import { UserCarsService } from "./user-cars.service";

@ApiTags("User cars")
@Controller('user-cars')
export class UserCarsController {
    constructor(private userCarsService: UserCarsService) { }

    @ApiOperation({ summary: "Creating user car" })
    @ApiResponse({ status: 200, type: UserCars })
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() userCarsDto: CreateUserCarsDto) {
        return this.userCarsService.createUserCar(userCarsDto);
    }

    @ApiOperation({ summary: "Getting all user cars" })
    @ApiResponse({ status: 200, type: [UserCars] })
    @UseGuards(JwtAuthGuard)
    @Get('all-cars/:userId')
    getAllUserCarsById(@Param('userId') userId: number) {
        return this.userCarsService.getAllUserCars(userId);
    }

    @ApiOperation({ summary: "Getting all users who own car(-s)" })
    @ApiResponse({ status: 200, type: [UserCars] })
    @UseGuards(JwtAuthGuard)
    @Get('all-users')
    getAllUsers() {
        return this.userCarsService.getAllUserIds();
    }

    @ApiOperation({ summary: "Getting user car" })
    @ApiResponse({ status: 200, type: UserCars })
    @UseGuards(JwtAuthGuard)
    @Get(':userId/cars/:carId')
    getUserCarById(@Param() params: GetUserCar) {
        return this.userCarsService.getUserCar(params);
    }

    @ApiOperation({ summary: "Changing mileage" })
    @ApiResponse({ status: 200, type: Number })
    @UseGuards(JwtAuthGuard)
    @Put(':userId/cars/:carId')
    update(@Param() params: GetUserCar, @Body() mileageDto: updateMileage) {
        return this.userCarsService.updateMileage(params, mileageDto);
    }

    @ApiOperation({ summary: "Deleting user car" })
    @ApiResponse({ status: 200, type: Number })
    @UseGuards(JwtAuthGuard)
    @Delete(':userId/cars/:carId')
    remove(@Param() params: GetUserCar) {
        return this.userCarsService.remove(params);
    }
}
