import { Part } from 'src/parts/parts.model';
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { CreatePartDTO } from './dto/create-part.dto';
import {GetPartsDTO} from './dto/get-part.dto';
import { UpdatePartDTO } from './dto/update-part.dto';
import { PartsService } from './parts.service';

@ApiTags("Parts")
@Controller('parts')
export class PartsController {
    constructor(private partService:PartsService){}

    @ApiOperation({summary:'Get all parts related to the car ID'})
    @ApiResponse({status:200, type:[Part]})
    @Get(':carId')
    getAllPartsByCarID(@Param() getPartDTO: GetPartsDTO){
        return this.partService.getAllPartsByCarID(getPartDTO);
    }

    @ApiOperation({summary:'Add part to the database. Returns added Part'})
    @ApiResponse({status:200, type:Part})
    @Post()
    createPart(@Body() createPartDTO:CreatePartDTO){
        return this.partService.createPart(createPartDTO);
    }
    
    @ApiOperation({summary:'Update part in the database. Returns a number of updated parts'})
    @ApiResponse({status:200, type:[Number]})
    @ApiQuery({description:"ID of part to update",required:false})
    @Put(':partId')
    updatePart(@Param('partId') partId:number, @Body() updatePartDTO:UpdatePartDTO){
        return this.partService.updatePart(partId, updatePartDTO);
    }

    @ApiOperation({summary:'Delete part by its ID. Returns 1 on success, 0 on fail or such part was not found'})
    @ApiResponse({status:200, type:[Number]})
    @ApiQuery({description:"ID of part to delete",required:false})
    @Delete(':partId')
    delete(@Param('partId') partId:number){
        return this.partService.remove(partId);
    }
}
