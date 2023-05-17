import { Controller, UseGuards, Post, Body, Get, Param, Delete, Query, HttpException, HttpStatus } from "@nestjs/common";
import { Roles, RolesGuard, CreateRepairsHistory, DeleteRepairsHistoryDto } from "inq-shared-lib";
import { RepairsHistoryService } from "./repairs-history.service";

@Controller('repairs-history')
export class RepairsHistoryController {
    constructor(private repairsHistoryService: RepairsHistoryService) { }

    // @Roles("CARSERVICE")
    // @UseGuards(RolesGuard)
    @Post('begin-service')
    create(@Body() dto: CreateRepairsHistory) {
        return this.repairsHistoryService.create(dto);
    }

    @Roles("CARSERVICE")
    @UseGuards(RolesGuard)
    @Post('end-service')
    createFromArray(@Body() dto: { initialRepairHistoryId: number } & { carOperationIds: number[] } & CreateRepairsHistory) {
        return this.repairsHistoryService.createFromArray(dto);
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
    @Get('car-service-unsigned-history/:carServiceId')
    getAllUnsignedCarServiceHistory(@Param('carServiceId') carServiceId: number) {
        return this.repairsHistoryService.getAllUnsignedCarServiceHistory(carServiceId);
    }

    @Roles("CARSERVICE")
    @UseGuards(RolesGuard)
    @Get()
    getPosts(@Query('search') search: string) {
      if (!search) {
        throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
    }
    return this.repairsHistoryService.searchForRepairsHistory(search);
    }

    @Roles("CARSERVICE")
    @UseGuards(RolesGuard)
    @Delete('repair-history-id/:id')
    remove(@Param() params: DeleteRepairsHistoryDto) {
        return this.repairsHistoryService.remove(params);
    }
}
