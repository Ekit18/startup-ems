import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Brand } from './brand.model';
import { BrandService } from './brand.service';
import { BrandDto } from './dto/brand.dto';

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
