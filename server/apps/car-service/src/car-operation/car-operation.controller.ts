import { Controller, UseGuards, Post, Body, Get, Param, Put, Delete } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CarOperation, Roles, RolesGuard, CreateCarOperationDto, JwtAuthGuard, UpdateCarOperationDto } from "inq-shared-lib";
import { CarOperationService } from "./car-operation.service";

@ApiTags("Car operation")
@Controller('car-operation')
export class CarOperationController {
    constructor(private carOperationService: CarOperationService) { }

    @ApiOperation({ summary: "Creating car operation" })
    @ApiResponse({ status: 200, type: CarOperation })
    @Roles("CARSERVICE")
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() dto: CreateCarOperationDto) {
        return this.carOperationService.createCarOperation(dto);
    }

    @ApiOperation({ summary: 'Getting one car operation from database' })
    @ApiResponse({ status: 200, type: CarOperation })
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getCarOperationById(@Param('id') id: number) {
        return this.carOperationService.getCarOperationById(id);
    }

    @ApiOperation({ summary: 'Getting all car operation from database' })
    @ApiResponse({ status: 200, type: CarOperation })
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllCarOperationById() {
        return this.carOperationService.getAllCarOperationById();
    }

    @ApiOperation({ summary: 'Updating car operation in database' })
    @ApiResponse({ status: 200, type: Number })
    @Roles("CARSERVICE")
    @UseGuards(RolesGuard)
    @Put(':id')
    update(@Param('id') id: number, @Body() params: UpdateCarOperationDto) {
        return this.carOperationService.updateCarOperation(id, params);
    }

    @ApiOperation({ summary: 'Deleting car operation from database' })
    @ApiResponse({ status: 200, type: Number })
    @Roles("CARSERVICE")
    @UseGuards(RolesGuard)
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.carOperationService.remove(id);
    }
}
