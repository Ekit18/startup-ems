import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStockDTO } from './dto/create-stock.dto';
import { GetStockDTO } from './dto/get-stock.dto';
import { UpdateStockDTO } from './dto/update-stock.dto';
import { ShopStockList } from './shop_stock_list.model';

@Injectable()
export class ShopStockListService {
    constructor(@InjectModel(ShopStockList) private shopStockRepository: typeof ShopStockList) { }
    async getStockByShopIdPartId(id: GetStockDTO) {
        const stock = await this.shopStockRepository.findOne({ where: { shopId: id.shopId, partId: id.partId } });
        if (!stock) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return stock;
    }
    async createStock(createStockDto: CreateStockDTO) {
        try {
        const stock = await this.shopStockRepository.create(createStockDto);
        return stock;
        } catch (err) {
            throw new HttpException(err.name, HttpStatus.BAD_REQUEST);
        }
    }
    async updateStock(shopId:number, partId:number, updateStockDto: UpdateStockDTO) {
        if (!Object.keys(updateStockDto).length) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }

        const updatedStock = await this.shopStockRepository.update({ ...updateStockDto }, { where: { shopId, partId } });
        if (!updatedStock[0]) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return updatedStock;
    }
    async deleteStock(shopId:number, partId:number) {
        const result = await this.shopStockRepository.destroy({ where: { shopId, partId } });
        if (!result) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
    }
}
