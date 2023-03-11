import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateStockDTO } from './dto/create-stock.dto';
import { GetStockDTO } from './dto/get-stock.dto';
import { UpdateStockDTO } from './dto/update-stock.dto';
import { ShopStockListService } from './shop_stock_list.service';

@Controller('shop_stock_list')
export class ShopStockListController {
    constructor(private shopStockListService: ShopStockListService) {}
    @ApiOperation({ summary: 'Get stock info of a part in a shop by shopId and partId' })
    @Get(':shopId/:partId')
    getStockByShopIdPartId(@Param() id: GetStockDTO) {
        return this.shopStockListService.getStockByShopIdPartId(id);
    }
    @ApiOperation({ summary: 'Create stock info of a part in a shop by shopId and partId' })
    @Post()
    createStock(@Body() createStockDto: CreateStockDTO) {
        return this.shopStockListService.createStock(createStockDto);
    }
    @ApiOperation({ summary: 'Update stock info of a part in a shop by shopId and partId' })
    @Put(':shopId/:partId')
    updateStock(@Param('shopId') shopId:number, @Param('partId') partId:number, @Body() updateStockDto: UpdateStockDTO) {
        return this.shopStockListService.updateStock(shopId, partId, updateStockDto);
    }
    @ApiOperation({ summary: 'Delete stock info of a part in a shop by shopId and partId' })
    @Delete(':shopId/:partId')
    deleteStock(@Param('shopId') shopId:number, @Param('partId') partId:number) {
        return this.shopStockListService.deleteStock(shopId, partId);
    }
}
