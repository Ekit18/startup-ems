import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
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
    model: string;
}

@ApiTags("Cars")
@Controller('car')
export class CarController {
    constructor(private carService: CarService) { }


    @ApiOperation({ summary: "Creating car" })
    @ApiResponse({ status: 200, type: Car })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() carDto: CarDto) {
        return this.carService.createCar(carDto);
    }


    @ApiOperation({ summary: "Getting all cars by model id" })
    @ApiResponse({ status: 200, type: [Car] })
    @UseGuards(JwtAuthGuard)
    @Get('model/:model')
    getAllByModelId(@Param() dto: GetCarByModelDto) {
        return this.carService.getAllCarByModel(dto);
    }

    @ApiOperation({ summary: "Getting all models by brand id" })
    @ApiResponse({ status: 200, type: [ModelResponse] })
    @UseGuards(JwtAuthGuard)
    @Get('brand/:brandId')
    getAllModelsByBrand(@Param() dto: GetCarByBrandIdDto) {
        return this.carService.getAllCarsModelsByBrand(dto);
    }

    @ApiOperation({ summary: "Changing car by car id" })
    @ApiResponse({ status: 200 })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Put(':id')
    update(@Param('id') id: number, @Body() carDto: UpdateCarDto) {
        return this.carService.updateCar(id, carDto);
    }

    @ApiOperation({ summary: "Deleting car by car id" })
    @ApiResponse({ status: 200 })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.carService.remove(id);
    }
}
