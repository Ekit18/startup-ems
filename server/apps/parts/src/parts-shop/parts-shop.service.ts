import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { PartsShop, GetShopDTO, CreateShopDTO, UpdateShopDTO } from "inq-shared-lib";

@Injectable()
export class PartsShopService {
    constructor(@InjectModel(PartsShop) private PartsShopRepository: typeof PartsShop) { }

    async getShopByShopId(getShopDTO: GetShopDTO) {
        const shop = await this.PartsShopRepository.findOne({ where: { shopId: getShopDTO.shopId }, include: { all: true } });
        if (!shop) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return shop;
    }
    async createShop(createShopDto: CreateShopDTO) {
        const candidateShop = await PartsShop.findOne({ where: { ...createShopDto } });
        if (candidateShop) {
            throw new HttpException({ message: 'Such shop with name, gps and site already exists' }, HttpStatus.BAD_REQUEST);
        }
        const shop = await this.PartsShopRepository.create(createShopDto);
        return shop;
    }
    async updateShop(id: number, updateShopDto: UpdateShopDTO) {
        if (!Object.keys(updateShopDto).length) {
            throw new HttpException({ message: 'Empty dto' }, HttpStatus.BAD_REQUEST);
        }
        const updatedShop = await this.PartsShopRepository.update({ ...updateShopDto }, { where: { shopId: id } });
        if (updatedShop[0] === 0) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return updatedShop;
    }
    async removeShop(id: number) {
        const result = await this.PartsShopRepository.destroy({ where: { shopId: id } });
        if (!result) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
    }
}
