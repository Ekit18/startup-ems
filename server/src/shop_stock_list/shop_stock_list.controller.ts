import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateStockDTO } from './dto/create-stock.dto';
import { GetStockDTO } from './dto/get-stock.dto';
import { UpdateStockDTO } from './dto/update-stock.dto';
import { ShopStockListService } from './shop_stock_list.service';

@Controller('shop_stock_list')
export class ShopStockListController {
    constructor(private shopStockListService: ShopStockListService) {}
    @UseGuards(JwtAuthGuard)
    @Get(':shopId/:partId')
    getStockByShopIdPartId(@Param() id: GetStockDTO) {
        return this.shopStockListService.getStockByShopIdPartId(id);
    }
    @Roles("PARTSHOP")
    @UseGuards(RolesGuard)
    @Post()
    createStock(@Body() createStockDto: CreateStockDTO) {
        return this.shopStockListService.createStock(createStockDto);
    }
    @Roles("PARTSHOP")
    @UseGuards(RolesGuard)
    @Put(':shopId/:partId')
    updateStock(@Param('shopId') shopId:number, @Param('partId') partId:number, @Body() updateStockDto: UpdateStockDTO) {
        return this.shopStockListService.updateStock(shopId, partId, updateStockDto);
    }
    @Roles("PARTSHOP")
    @UseGuards(RolesGuard)
    @Delete(':shopId/:partId')
    deleteStock(@Param('shopId') shopId:number, @Param('partId') partId:number) {
        return this.shopStockListService.deleteStock(shopId, partId);
    }
}
