import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateRepairsHistory } from './dto/create-repairs-history.dto';
import { RepairsHistoryService } from './repairs-history.service';

@Controller('repairs-history')
export class RepairsHistoryController {
    constructor(private repairsHistoryService: RepairsHistoryService) { }

    @Post()
    create(@Body() dto: CreateRepairsHistory) {
        return this.repairsHistoryService.create(dto);
    }

    @Get('all-car-history/:userCarId')
    getAllCarHistory(@Param('userCarId') userCarId: number) {
        return this.repairsHistoryService.getAllCarHistory(userCarId);
    }

    @Get('car-service-history/:carServiceId')
    getAllCarServiceHistory(@Param('carServiceId') carServiceId: number) {
        return this.repairsHistoryService.getAllCarServiceHistory(carServiceId);
    }

    @Delete('car-service/:carServiceId/user-car/:userCarId/car-operation/:carOperationId')
    remove(@Param() params: CreateRepairsHistory) {
        return this.repairsHistoryService.remove(params);
    }
}
