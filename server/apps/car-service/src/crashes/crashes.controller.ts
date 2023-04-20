import { Controller, Post, Body, Get, Param, Put, Delete } from "@nestjs/common";
import { CreateCrashDTO, UpdateCrashDTO } from "inq-shared-lib";
import { CrashesService } from "./crashes.service";

@Controller('crashes')
export class CrashesController {
    constructor(private crashesService: CrashesService) { }

    @Post()
    create(@Body() dto: CreateCrashDTO) {
        return this.crashesService.createCrash(dto);
    }

    @Get('user-crashes/:userId')
    getCrashByUserId(@Param('userId') userId: number) {
        return this.crashesService.getAllUserCrashes(userId);
    }

    // @Get()
    // getAllCrashes() {
    //     return this.crashesService.getAllCrashesWithCars();
    // }

    @Get('all-user-crashes/:userId')
    getAllUserCrashes(@Param('userId') userId: number) {
        return this.crashesService.getAllUserCrashes(userId);
    }

    @Put('/:id')
    update(@Param('id') id: number, @Body() params: UpdateCrashDTO) {
        return this.crashesService.updateCrash(id, params);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.crashesService.removeCrash(id);
    }
}
