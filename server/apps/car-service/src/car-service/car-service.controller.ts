import { Controller, UseGuards, Post, Body, Get, Param, Put, Delete } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CarService } from "apps/car/src/car/car.service";
import { Roles, RolesGuard, CreateCarServiceDto, JwtAuthGuard, UpdateCarServiceDto } from "inq-shared-lib";
import { CarServicesServices } from "./car-service.service";

@ApiTags("Car service")
@Controller('car-service')
export class CarServicesController {
    constructor(private carServiceService: CarServicesServices) { }

    @ApiOperation({ summary: 'Creating car service from database' })
    @ApiResponse({ status: 200, type: CarService })
    @Roles("CARSERVICE")
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() carServiceDto: CreateCarServiceDto) {
        return this.carServiceService.createCarService(carServiceDto);
    }

    @ApiOperation({ summary: 'Getting car service from database' })
    @ApiResponse({ status: 200, type: CarService })
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getCarServiceById(@Param('id') id: number) {
        return this.carServiceService.getCarServiceById(id);
    }

    @ApiOperation({ summary: 'Getting car services' })
    @ApiResponse({ status: 200, type: Array<CarService> })
    @UseGuards(JwtAuthGuard)
    @Get()
    getCarServices() {
        return this.carServiceService.getCarServices();
    }

    @ApiOperation({ summary: 'Updating car service in database' })
    @ApiResponse({ status: 200, type: Number })
    @Roles("CARSERVICE")
    @UseGuards(RolesGuard)
    @Put(':id')
    update(@Param('id') id: number, @Body() params: UpdateCarServiceDto) {
        return this.carServiceService.updateCarService(id, params);
    }

    @ApiOperation({ summary: 'Deleting car service from database' })
    @ApiResponse({ status: 200, type: Number })
    @Roles("CARSERVICE")
    @UseGuards(RolesGuard)
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.carServiceService.remove(id);
    }
}
