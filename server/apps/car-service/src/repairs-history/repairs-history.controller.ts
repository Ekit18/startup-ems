import { Controller, UseGuards, Post, Body, Get, Param, Delete, Query, HttpException, HttpStatus } from "@nestjs/common";
import { Roles, RolesGuard, CreateRepairsHistory, DeleteRepairsHistoryDto, SearchRepairsHistoryDto, GoogleCodeDto, QueryRepairsHistoryDto } from "inq-shared-lib";
import { RepairsHistoryService } from "./repairs-history.service";


@Controller('repairs-history')
export class RepairsHistoryController {
    constructor(private repairsHistoryService: RepairsHistoryService) { }
    count = 0;
    // @Roles("CARSERVICE")
    // @UseGuards(RolesGuard)
    getRandomNumberInRange(min, max): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    @Post('begin-service')
    create() {
        // @Body() dto: CreateRepairsHistory
        // const dto = {
        //     userCarId: this.getRandomNumberInRange(5, 90005),
        //     carServiceId: this.getRandomNumberInRange(121, 240),
        //     carOperationId: this.getRandomNumberInRange(0, 13),
        //     isSigned: true
        // };
        const dto = {
            userCarId: this.getRandomNumberInRange(5, 90005),
            carServiceId: 121,
            carOperationId: 8,
            isSigned: true
        };
        this.count++;
        console.log(this.count);
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
    @Get('search/:carServiceId/:carOperationId')
    searchRepairsHistory(@Param() params: SearchRepairsHistoryDto, @Query() query?: QueryRepairsHistoryDto) {
        if (!params) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return this.repairsHistoryService.searchForRepairsHistory(params.carServiceId, params.carOperationId, query.scrollId);
    }


    @Roles("CARSERVICE")
    @UseGuards(RolesGuard)
    @Delete(':id')
    remove(@Param() params: DeleteRepairsHistoryDto) {
        return this.repairsHistoryService.remove(params);
    }
}
