import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
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

    // @ApiOperation({ summary: 'Getting car services' })
    // @ApiResponse({ status: 200, type: Array<CarService> })
    // @UseGuards(JwtAuthGuard)
    // @Get()
    // getCarServices() {
    //     return this.carServiceService.getCarServices();
    // }

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
