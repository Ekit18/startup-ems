import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { CreatePartDTO } from 'src/parts/dto/create-part.dto';
import { GetPartsDTO } from 'src/parts/dto/get-part.dto';
import { Car } from './car.model';
import { CarService } from './car.service';
import { CarDto } from './dto/car.dto';
import { GetCarByBrandIdDto } from './dto/get-car-by-brand-id.dto';
import { GetCarByModelDto } from './dto/get-car-by-model-id.dto';
import { UpdateCarDto } from './dto/update-car.dto';


class ModelResponse {
    @ApiProperty({ example: 'Octavia' })
    model: string
}

@ApiTags("Cars")
@Controller('car')
export class CarController {
    constructor(private carService: CarService) { }


    @ApiOperation({ summary: "Creating car" })
    @ApiResponse({ status: 200, type: Car })
    @Post()
    create(@Body() carDto: CarDto) {
        return this.carService.createCar(carDto);
    }


    @ApiOperation({ summary: "Getting all cars by model id" })
    @ApiResponse({ status: 200, type: [Car] })
    @Get('model/:model')
    getAllByModelId(@Param() dto: GetCarByModelDto) {
        return this.carService.getAllCarByModel(dto);
    }

    @ApiOperation({ summary: "Getting all models by brand id" })
    @ApiResponse({ status: 200, type: [ModelResponse] })
    @Get('brand/:brandId')
    getAllModelsByBrand(@Param() dto: GetCarByBrandIdDto) {
        return this.carService.getAllCarsModelsByBrand(dto);
    }

    @ApiOperation({ summary: "Changing car by car id" })
    @ApiResponse({ status: 200})
    @Put(':id')
    update(@Param('id') id: number, @Body() carDto: UpdateCarDto) {
        return this.carService.updateCar(id, carDto);
    }

    @ApiOperation({ summary: "Deleting car by car id" })
    @ApiResponse({ status: 200})
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.carService.remove(id);
    }

}
