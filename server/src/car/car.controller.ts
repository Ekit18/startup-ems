import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CarService } from './car.service';
import { CarDto } from './dto/car.dto';
import { GetCarByBrandIdDto } from './dto/get-car-by-brand-id.dto';
import { GetCarByModelDto } from './dto/get-car-by-model-id.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('car')
export class CarController {
    constructor(private carService: CarService) { }

    @Post()
    create(@Body() carDto: CarDto) {
        return this.carService.createCar(carDto);
    }



    @Get('model/:model')
    getAllByModelId(@Param() dto: GetCarByModelDto) {
        return this.carService.getAllCarByModel(dto);
    }


    @Get('brand/:brandId')
    getAllModelsByBrand(@Param() dto: GetCarByBrandIdDto) {
        return this.carService.getAllCarsModelsByBrand(dto);
    }


    @Put(':id')
    update(@Param('id') id: number, @Body() carDto: UpdateCarDto) {
        return this.carService.updateCar(id, carDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.carService.remove(id);
    }

}
