import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CarService } from 'src/car/car.service';
import { CarServicesServices } from './car-service.service';
import { CreateCarServiceDto } from './dto/create-car-service.dto';
import { UpdateCarServiceDto } from './dto/update-car-service.dto';


@ApiTags("Car service")
@Controller('car-service')
export class CarServicesController {
    constructor(private carServiceService: CarServicesServices) { }

    @ApiOperation({ summary: 'Creating car service from database' })
    @ApiResponse({ status: 200, type: CarService })
    @Post()
    create(@Body() carServiceDto: CreateCarServiceDto) {
        return this.carServiceService.createCarService(carServiceDto);
    }

    @ApiOperation({ summary: 'Getting car service from database' })
    @ApiResponse({ status: 200, type: CarService })
    @Get('/:id')
    getCarServiceById(@Param('id') id: number) {
        return this.carServiceService.getCarServiceById(id);
    }

    @ApiOperation({ summary: 'Updating car service in database' })
    @ApiResponse({ status: 200, type: Number })
    @Put(':id')
    update(@Param('id') id: number, @Body() params: UpdateCarServiceDto) {
        return this.carServiceService.updateCarService(id, params);
    }

    @ApiOperation({ summary: 'Deleting car service from database' })
    @ApiResponse({ status: 200, type: Number })
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.carServiceService.remove(id);
    }
}
