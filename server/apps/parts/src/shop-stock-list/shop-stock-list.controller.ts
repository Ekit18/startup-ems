import { Controller, UseGuards, Get, Param, Post, Body, Put, Delete } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard, GetStockDTO, GetPartsByShopDTO, GetShopsByPartDTO, Roles, RolesGuard, CreateStockDTO, UpdateStockDTO } from "inq-shared-lib";
import { ShopStockListService } from "./shop-stock-list.service";

@Controller('shop-stock-list')
export class ShopStockListController {
    constructor(private shopStockListService: ShopStockListService) { }

    @ApiOperation({ summary: 'Get stock info of a part in a shop by shopId and partId' })
    @UseGuards(JwtAuthGuard)
    @Get(':shopId/:partId')
    getStockByShopIdPartId(@Param() id: GetStockDTO) {
        return this.shopStockListService.getStockByShopIdPartId(id);
    }
    @ApiOperation({ summary: 'Get all parts of the shop by shopId' })
    @Get('getters/all-parts/:shopId')
    getPartsByShopId(@Param() id: GetPartsByShopDTO) {
        return this.shopStockListService.getPartsByShopId(id);
    }
    @ApiOperation({ summary: 'Get all shops that sell the part by partId' })
    @Get('getters/all-shops/:partId')
    getShopsByPartId(@Param() id: GetShopsByPartDTO) {
        return this.shopStockListService.getShopsByPartId(id);
    }
    @Roles("PARTSHOP")
    @UseGuards(RolesGuard)
    @Post()
    createStock(@Body() createStockDto: CreateStockDTO) {
        return this.shopStockListService.createStock(createStockDto);
    }
    @ApiOperation({ summary: 'Update stock info of a part in a shop by shopId and partId' })
    @Roles("PARTSHOP")
    @UseGuards(RolesGuard)
    @Put(':shopId/:partId')
    updateStock(@Param('shopId') shopId: number, @Param('partId') partId: number, @Body() updateStockDto: UpdateStockDTO) {
        return this.shopStockListService.updateStock(shopId, partId, updateStockDto);
    }
    @ApiOperation({ summary: 'Delete stock info of a part in a shop by shopId and partId' })
    @Roles("PARTSHOP")
    @UseGuards(RolesGuard)
    @Delete(':shopId/:partId')
    deleteStock(@Param('shopId') shopId: number, @Param('partId') partId: number) {
        return this.shopStockListService.deleteStock(shopId, partId);
    }
}
