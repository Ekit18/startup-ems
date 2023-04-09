import { CrashesService } from './crashes.service';
import { CreateCrashDTO } from './dto/create-crash.dto';
import { UpdateCrashDTO } from './dto/update-crash.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
@Controller('crashes')
export class CrashesController {
    constructor(private crashesService: CrashesService) { }

    @Post()
    create(@Body() dto: CreateCrashDTO) {
        return this.crashesService.createCrash(dto);
    }

    @Get('/:userCarId')
    getCrashByUserId(@Param('userCarId') userCarId: number) {
        return this.crashesService.getCrashByUserId(userCarId);
    }

    @Get()
    getAllCrashes() {
        return this.crashesService.getAllCrashesWithCars();
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
