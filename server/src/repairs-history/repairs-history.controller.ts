import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateRepairsHistory } from './dto/create-repairs-history.dto';
import { RepairsHistoryService } from './repairs-history.service';

@Controller('repairs-history')
export class RepairsHistoryController {
    constructor(private repairsHistoryService: RepairsHistoryService) { }

    @Roles("CARSERVICE")
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() dto: CreateRepairsHistory) {
        return this.repairsHistoryService.create(dto);
    }

    @Roles("CARSERVICE")
    @UseGuards(RolesGuard)
    @Get('all-car-history/:userCarId')
    getAllCarHistory(@Param('userCarId') userCarId: number) {
        return this.repairsHistoryService.getAllCarHistory(userCarId);
    }

    @Roles("CARSERVICE")
    @UseGuards(RolesGuard)
    @Get('car-service-history/:carServiceId')
    getAllCarServiceHistory(@Param('carServiceId') carServiceId: number) {
        return this.repairsHistoryService.getAllCarServiceHistory(carServiceId);
    }

    @Roles("CARSERVICE")
    @UseGuards(RolesGuard)
    @Delete('car-service/:carServiceId/user-car/:userCarId/car-operation/:carOperationId')
    remove(@Param() params: CreateRepairsHistory) {
        return this.repairsHistoryService.remove(params);
    }
}
