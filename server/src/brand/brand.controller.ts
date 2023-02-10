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
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        console.log(value)
        return this.brandService.getBrandByValue(value);
    }
    @Get()
    getAll() {
        return this.brandService.getAllBrands();
    }
    @Put(':id')
    update(@Param('id')id:number, @Body()brandDto:BrandDto){
        return this.brandService.updateBrand(id,brandDto);
    }
    @Delete(':id')
    remove(@Param('id')id:number){
        return this.brandService.remove(id);
    }
}
