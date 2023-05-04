import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CarServices, CreateCarServiceDto, JwtAuthGuard, Roles, RolesGuard, UpdateCarServiceDto } from "inq-shared-lib";
import { CarServicesServices } from "./car-service.service";

@ApiTags("Car service")
@Controller('car-service')
export class CarServicesController {
    constructor(private carServicesServices: CarServicesServices) { }

    @ApiOperation({ summary: 'Creating car service from database' })
    @ApiResponse({ status: 200, type: CarServices })
    @Roles("CARSERVICE")
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() carServiceDto: CreateCarServiceDto) {
        return this.carServicesServices.createCarService(carServiceDto);
    }

    @ApiOperation({ summary: 'Getting car service from database' })
    @ApiResponse({ status: 200, type: CarServices })
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getCarServiceById(@Param('id') id: number) {
        return this.carServicesServices.getCarServiceById(id);
    }

    @ApiOperation({ summary: 'Getting car services' })
    @ApiResponse({ status: 200, type: Array<CarServices> })
    @UseGuards(JwtAuthGuard)
    @Get()
    getCarServices() {
        return this.carServicesServices.getCarServices();
    }

    @ApiOperation({ summary: 'Updating car service in database' })
    @ApiResponse({ status: 200, type: Number })
    @Roles("CARSERVICE")
    @UseGuards(RolesGuard)
    @Put(':id')
    update(@Param('id') id: number, @Body() params: UpdateCarServiceDto) {
        return this.carServicesServices.updateCarService(id, params);
    }

    @ApiOperation({ summary: 'Deleting car service from database' })
    @ApiResponse({ status: 200, type: Number })
    @Roles("CARSERVICE")
    @UseGuards(RolesGuard)
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.carServicesServices.remove(id);
    }
}
