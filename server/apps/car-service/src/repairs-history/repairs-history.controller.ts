import { Controller, UseGuards, Post, Body, Get, Param, Delete } from "@nestjs/common";
import { Roles, RolesGuard, CreateRepairsHistory } from "inq-shared-lib";
import { RepairsHistoryService } from "./repairs-history.service";

@Controller('repairs-history')
export class RepairsHistoryController {
    constructor(private repairsHistoryService: RepairsHistoryService) { }

    @Roles("CARSERVICE")
    @UseGuards(RolesGuard)
    @Post('send_ai_message')
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
