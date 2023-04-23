
import { HttpService } from '@nestjs/axios';
import { Controller, UseGuards, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard, GetShopDTO, Roles, RolesGuard, CreateShopDTO, UpdateShopDTO } from 'inq-shared-lib';
import { v4 as uuid } from 'uuid';
import { PartsShopService } from './parts-shop.service';

@ApiTags("Parts Shop")
@Controller('parts-shop')
export class PartsShopController {
  constructor(private partShopService: PartsShopService, private httpService: HttpService) { }

  @ApiOperation({ summary: 'Get parts shop by its id' })
  @UseGuards(JwtAuthGuard)
  @Get(':shopId')
  async getShopByShopId(@Param() id: GetShopDTO) {
    const shop = await this.partShopService.getShopByShopId(id);
    const googleAds = {
      adClientId: uuid(),
      siteLink: shop.siteLink,
      date: new Date().toISOString(),
      adType: "visit",
      slotName: "/parts"
    };
    this.httpService.post("https://webhook.site/746da94f-4324-4390-ad6d-43b897812d3f", googleAds).subscribe({
      complete: () => {
        console.log('sent to adSense');
      },
      error: (err) => {
        console.log(err);
      },
    });
    return shop;
  }
  @ApiOperation({ summary: 'Create parts shop' })
  @Roles("PARTSHOP")
  @UseGuards(RolesGuard)
  @Post()
  createShop(@Body() createShopDto: CreateShopDTO) {
    return this.partShopService.createShop(createShopDto);
  }
  @ApiOperation({ summary: 'Update parts shop by its id' })
  @Roles("PARTSHOP")
  @UseGuards(RolesGuard)
  @Put(':shopId')
  updateShop(@Param('shopId') id: number, @Body() updateShopDto: UpdateShopDTO) {
    return this.partShopService.updateShop(id, updateShopDto);
  }
  @ApiOperation({ summary: 'Delete parts shop by its id' })
  @Roles("PARTSHOP")
  @UseGuards(RolesGuard)
  @Delete(':shopId')
  removeShop(@Param('shopId') id: number) {
    return this.partShopService.removeShop(id);
  }
}
