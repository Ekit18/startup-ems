import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
    CreatePartDTO,
    GetPartDetailsDTO,
    GetPartsDTO,
    JwtAuthGuard,
    Part,
    Roles,
    RolesGuard,
    UpdatePartDTO
} from "inq-shared-lib";
import { PartsService } from "./parts.service";

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

    @ApiOperation({ summary: 'Get detailed info about all parts' })
    @ApiResponse({ status: 200, type: [Part] })
    @Get()
    getAllPartDetails(): Promise<Part[]> {
        return this.partService.getAllPartDetails();
    }

    @Roles("CARSERVICE", "PARTSHOP")
    @UseGuards(RolesGuard)
    @Post()
    createPart(@Body() createPartDTO: CreatePartDTO) {
        return this.partService.createPart(createPartDTO);
    }

    @ApiOperation({ summary: 'Update part inS the database. Returns a number of updated parts' })
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
