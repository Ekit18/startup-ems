import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateShopDTO } from './dto/create-shop.dto';
import { GetShopDTO } from './dto/get-shop.dto';
import { UpdateShopDTO } from './dto/update-shop.dto';
import { PartsShopService } from './parts_shop.service';

@ApiTags("Parts Shop")
@Controller('parts_shop')
export class PartsShopController {
    constructor(private partShopService: PartsShopService) { }

    @ApiOperation({ summary: 'Get parts shop by its id' })
    @Get(':shopId')
    getShopByShopId(@Param() id: GetShopDTO) {
        return this.partShopService.getShopByShopId(id);
    }
    @ApiOperation({ summary: 'Create parts shop' })
    @Post()
    createShop(@Body() createShopDto: CreateShopDTO) {
        return this.partShopService.createShop(createShopDto);
    }
    @ApiOperation({ summary: 'Update parts shop by its id' })
    @Put(':shopId')
    updateShop(@Param('shopId') id: number, @Body() updateShopDto: UpdateShopDTO) {
        return this.partShopService.updateShop(id, updateShopDto);
    }
    @ApiOperation({ summary: 'Delete parts shop by its id' })
    @Delete(':shopId')
    removeShop(@Param('shopId') id: number) {
        return this.partShopService.removeShop(id);
    }
}
