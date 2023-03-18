import { Part } from 'src/parts/parts.model';
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { CreatePartDTO } from './dto/create-part.dto';
import { GetPartsDTO } from './dto/get-part.dto';
import { UpdatePartDTO } from './dto/update-part.dto';
import { PartsService } from './parts.service';
import { GetPartDetailsDTO } from './dto/get-part-details.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common/decorators';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';


@ApiTags("Parts")
@Controller('parts')
export class PartsController {
    constructor(private partService: PartsService) { }

    @ApiOperation({ summary: 'Get all parts related to the car ID' })
    @ApiResponse({ status: 200, type: [Part] })
    @UseGuards(JwtAuthGuard)
    @Get(':carId')
    getAllPartsByCarID(@Param() getPartDTO: GetPartsDTO) {
        return this.partService.getAllPartsByCarID(getPartDTO);
    }
    @ApiOperation({ summary: 'Get detailed info about the part by partId' })
    @ApiResponse({ status: 200, type: Part })
    @Get('part_info/:partId')
    getPartDetails(@Param() getPartDetailsDTO: GetPartDetailsDTO) {
        return this.partService.getPartById(getPartDetailsDTO.partId);
    }

    @ApiOperation({ summary: 'Add part to the database. Returns added Part' })
    @ApiResponse({ status: 200, type: Part })
    @Roles("CARSERVICE", "PARTSHOP")
    @UseGuards(RolesGuard)
    @Post()
    createPart(@Body() createPartDTO: CreatePartDTO) {
        return this.partService.createPart(createPartDTO);
    }

    @ApiOperation({ summary: 'Update part in the database. Returns a number of updated parts' })
    @ApiResponse({ status: 200, type: [Number] })
    @Roles("CARSERVICE", "PARTSHOP")
    @UseGuards(RolesGuard)
    @Put(':partId')
    updatePart(@Param('partId') partId: number, @Body() updatePartDTO: UpdatePartDTO) {
        return this.partService.updatePart(partId, updatePartDTO);
    }

    @ApiOperation({ summary: 'Delete part by its ID. Returns 1 on success, 0 on fail or such part was not found' })
    @ApiResponse({ status: 200, type: [Number] })
    @ApiQuery({ description: "ID of part to delete", required: false })
    @Roles("CARSERVICE", "PARTSHOP")
    @UseGuards(RolesGuard)
    @Delete(':partId')
    delete(@Param('partId') partId: number) {
        return this.partService.remove(partId);
    }
}
