import { Part } from '../parts/parts.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStockDTO } from './dto/create-stock.dto';
import { GetPartsByShopDTO } from './dto/get-parts-by-shop';
import { GetStockDTO } from './dto/get-stock.dto';
import { UpdateStockDTO } from './dto/update-stock.dto';
import { ShopStockList } from './shop-stock-list.model';
import { GetShopsByPartDTO } from './dto/get-shops-by-part';
import { PartsShop } from 'src/parts_shop/parts-shop.model';

@Injectable()
export class ShopStockListService {
    constructor(@InjectModel(ShopStockList) private shopStockRepository: typeof ShopStockList,
        @InjectModel(Part) private partsRepository: typeof Part,
        @InjectModel(PartsShop) private shopsRepository: typeof PartsShop) { }
    async getStockByShopIdPartId(id: GetStockDTO) {
        const stock = await this.shopStockRepository.findOne({ where: { shopId: id.shopId, partId: id.partId } });
        if (!stock) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return stock;
    }
    async getShopsByPartId(id: GetShopsByPartDTO) {
        const shops: ShopStockList[] = await this.shopStockRepository.findAll({ where: { partId: id.partId } });
        return Promise.all(shops.map(async (shop) => {
            const neededShop = await this.shopsRepository.findOne({ where: { shopId: shop.shopId } }).then((shopItSelf) => ({ ...shopItSelf.get(), price: shop.price, isAvailable: shop.isAvailable }));
            return neededShop;
        }));
    }
    async getPartsByShopId(id: GetPartsByShopDTO) {
        const parts: ShopStockList[] = await this.shopStockRepository.findAll({ where: { shopId: id.shopId } });
        return Promise.all(parts.map(async (part) => {
            const neededPart = await this.partsRepository.findOne({ where: { partId: part.partId } }).then((partItself) => ({ ...partItself.get(), price: part.price }));
            return neededPart;
        }));
    }
    async createStock(createStockDto: CreateStockDTO) {
        const candidate = await this.shopStockRepository.findOne({ where: { partId: createStockDto.partId, shopId: createStockDto.shopId } });
        if (candidate) {
            throw new HttpException({ message: 'Such stock with partId, shopId already exists' }, HttpStatus.BAD_REQUEST);
        }
        const stock = await this.shopStockRepository.create(createStockDto);
        return stock;
    }
    async updateStock(shopId: number, partId: number, updateStockDto: UpdateStockDTO) {
        if (!Object.keys(updateStockDto).length) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }

        const updatedStock = await this.shopStockRepository.update({ ...updateStockDto }, { where: { shopId, partId } });
        if (!updatedStock[0]) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return updatedStock;
    }
    async deleteStock(shopId: number, partId: number) {
        const result = await this.shopStockRepository.destroy({ where: { shopId, partId } });
        if (!result) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
    }
}
