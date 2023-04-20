import { Controller, UseGuards, Post, Body, Get, Param, Put, Delete } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Brand, Roles, RolesGuard, BrandDto, JwtAuthGuard } from "inq-shared-lib";
import { BrandService } from "./brand.service";

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
    constructor(private brandService: BrandService) { }
    @ApiOperation({ summary: 'Creating new brand' })
    @ApiResponse({ status: 200, type: Brand })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() brandDto: BrandDto) {
        return this.brandService.createBrand(brandDto);
    }

    @ApiOperation({ summary: 'Searching brand by name' })
    @ApiResponse({ status: 200, type: Brand })
    @UseGuards(JwtAuthGuard)
    @Get('/:brand')
    getByValue(@Param() params: BrandDto) {
        return this.brandService.getBrandByValue(params);
    }

    @ApiOperation({ summary: 'Getting all brands from database' })
    @ApiResponse({ status: 200, type: [Brand] })
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.brandService.getAllBrands();
    }

    @ApiOperation({ summary: 'Changing information in brand' })
    @ApiResponse({ status: 200 })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Put(':id')
    update(@Param('id') id: number, @Body() brandDto: BrandDto) {
        return this.brandService.updateBrand(id, brandDto);
    }

    @ApiOperation({ summary: 'Deleting brand from database' })
    @ApiResponse({ status: 200 })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.brandService.remove(id);
    }
}
