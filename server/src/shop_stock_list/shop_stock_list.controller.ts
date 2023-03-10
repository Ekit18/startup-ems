import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateStockDTO } from './dto/create-stock.dto';
import { GetStockDTO } from './dto/get-stock.dto';
import { UpdateStockDTO } from './dto/update-stock.dto';
import { ShopStockListService } from './shop_stock_list.service';

@Controller('shop_stock_list')
export class ShopStockListController {
    constructor(private shopStockListService: ShopStockListService) {}

    @Get(':shopId/:partId')
    getStockByShopIdPartId(@Param() id: GetStockDTO){
        return this.shopStockListService.getStockByShopIdPartId(id);
    }
    @Post()
    createStock(@Body() createStockDto: CreateStockDTO){
        return this.shopStockListService.createStock(createStockDto);
    }
    @Put(':shopId/:partId')
    updateStock(@Param('shopId') shopId:number, @Param('partId') partId:number, @Body() updateStockDto: UpdateStockDTO){
        console.log("SHOPID: "+shopId)
        console.log("PARTID: "+partId)
        console.log("DTO: "+updateStockDto)
        return this.shopStockListService.updateStock(shopId,partId,updateStockDto);
    }
    @Delete(':shopId/:partId')
    deleteStock(@Param('shopId') shopId:number, @Param('partId') partId:number){
        return this.shopStockListService.deleteStock(shopId,partId);
    }

}
