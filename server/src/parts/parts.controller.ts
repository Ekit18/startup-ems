import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CreatePartDTO } from './dto/create-part.dto';
import {GetPartsDTO} from './dto/get-part.dto';
import { UpdatePartDTO } from './dto/update-part.dto';
import { PartsService } from './parts.service';

@Controller('parts')
export class PartsController {
    constructor(private partService:PartsService){}
    @Get('/:carId')
    getAllPartsByCarID(@Param() getPartDTO: GetPartsDTO){
        return this.partService.getAllPartsByCarID(getPartDTO);
    }
    @Post()
    createPart(@Body() createPartDTO:CreatePartDTO){
        return this.partService.createPart(createPartDTO);
    }
    @Put('/:partId')
    updatePart(@Param('partID') partId:number, @Body() updatePartDTO:UpdatePartDTO){
        return this.partService.updatePart(partId, updatePartDTO);
    }
    @Delete('/:partId')
    delete(@Param('partId') partId:number){
        return this.partService.remove(partId);
    }
}
