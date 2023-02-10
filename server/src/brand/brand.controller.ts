import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandDto } from './dto/brand.dto';

@Controller('brand')
export class BrandController {
    constructor(private brandService: BrandService) { }
    @Post()
    create(@Body() brandDto: BrandDto) {
        return this.brandService.createBrand(brandDto);
    }
    @Get('/:brand')
    getByValue(@Param() params: BrandDto) {
        return this.brandService.getBrandByValue(params);
    }
    @Get()
    getAll() {
        return this.brandService.getAllBrands();
    }
    @Put(':id')
    update(@Param() id: number, @Body() brandDto: BrandDto) {
        return this.brandService.updateBrand(id, brandDto);
    }
    @Delete(':id')
    remove(@Param() id: number) {
        return this.brandService.remove(id);
    }
}
