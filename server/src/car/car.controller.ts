import { HttpService } from '@nestjs/axios/dist/http.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { BrandService } from 'src/brand/brand.service';
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
    constructor(private carService: CarService, private readonly httpService: HttpService, private readonly brandService:BrandService) { }


    @ApiOperation({ summary: "Creating car" })
    @ApiResponse({ status: 200, type: Car })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    async create(@Body() carDto: CarDto) {
        const car = await this.carService.createCar(carDto);
        const brand = await this.brandService.getBrandById(carDto.brandId);
        const hookData = { brand: brand.brand, model: car.model, fuelType: car.fuelType, bodyType: car.bodyType, year: car.year };
        this.httpService
        .post('https://webhook.site/4b06c166-2ada-4ea4-86f0-2f9f0461503d', hookData)
        .subscribe({
            complete: () => {
                console.log('completed');
            },
            error: (err) => {
                console.log(err);
            },
        });
        return car;
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
