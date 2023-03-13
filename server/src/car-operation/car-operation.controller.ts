import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CarOperation } from './car-operation.model';
import { CarOperationService } from './car-operation.service';
import { CreateCarOperationDto } from './dto/create-car-operation.dto';
import { UpdateCarOperationDto } from './dto/update-car-operation.dto';

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

    @ApiOperation({ summary: 'Getting car operation from database' })
    @ApiResponse({ status: 200, type: CarOperation })
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getCarServiceById(@Param('id') id: number) {
        return this.carOperationService.getCarOperationById(id);
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
