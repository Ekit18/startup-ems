import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Brand } from './brand.model';
import { BrandService } from './brand.service';
import { BrandDto } from './dto/brand.dto';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
    constructor(private brandService: BrandService) { }
    @ApiOperation({ summary: 'Creating new brand' })
    @ApiResponse({ status: 200, type: Brand })
    @Post()
    create(@Body() brandDto: BrandDto) {
        return this.brandService.createBrand(brandDto);
    }


    @ApiOperation({ summary: 'Searching brand by name' })
    @ApiResponse({ status: 200, type: Brand })
    @Get('/:brand')
    getByValue(@Param() params: BrandDto) {
        return this.brandService.getBrandByValue(params);
    }


    @ApiOperation({summary:'Getting all brands from database'})
    @ApiResponse({status:200, type:[Brand]})
    @Get()
    getAll() {
        return this.brandService.getAllBrands();
    }


    @ApiOperation({summary:'Changing information in brand'})
    @ApiResponse({status:200})
    @Put(':id')
    update(@Param('id') id: number, @Body() brandDto: BrandDto) {
        return this.brandService.updateBrand(id, brandDto);
    }


    @ApiOperation({summary:'Deleting brand from database'})
    @ApiResponse({status:200})
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.brandService.remove(id);
    }
}
