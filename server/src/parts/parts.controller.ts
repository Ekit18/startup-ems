import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger/dist';
import { CreatePartDTO } from './dto/create-part.dto';
import {GetPartsDTO} from './dto/get-part.dto';
import { UpdatePartDTO } from './dto/update-part.dto';
import { PartsService } from './parts.service';

@ApiTags("Parts")
@Controller('parts')
export class PartsController {
    constructor(private partService:PartsService){}

    @ApiOperation({summary:'Get all parts related to the car ID'})
    @Get(':carId')
    getAllPartsByCarID(@Param() getPartDTO: GetPartsDTO){
        return this.partService.getAllPartsByCarID(getPartDTO);
    }
    @Post()
    createPart(@Body() createPartDTO:CreatePartDTO){
        return this.partService.createPart(createPartDTO);
    }
    @Put(':partId')
    updatePart(@Param('partId') partId:number, @Body() updatePartDTO:UpdatePartDTO){
        return this.partService.updatePart(partId, updatePartDTO);
    }
    @Delete(':partId')
    delete(@Param('partId') partId:number){
        return this.partService.remove(partId);
    }
}
