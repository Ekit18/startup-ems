import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Brand } from './brand.model';
import { BrandDto } from './dto/brand.dto';

@Injectable()
export class BrandService {
    constructor(@InjectModel(Brand) private brandRepository: typeof Brand) { }

    // TODO:check if brand already exist
    async createBrand(dto: BrandDto) {
        const brand = await this.brandRepository.create(dto);
        return brand;
    }
    async getBrandByValue(dto: BrandDto) {
        const brand = await this.brandRepository.findOne({ where: { brand: dto.brand } });
        if (!brand) {
            throw new HttpException({message:'Wrong data'}, HttpStatus.BAD_REQUEST);
        }
        return brand;
    }
    async getAllBrands() {
        const brands = await this.brandRepository.findAll();
        return brands;
    }
    async updateBrand(id: number, brandDto: BrandDto) {
        return Brand.update({ brand: brandDto.brand }, { where: { id: id } });
    }
    async remove(id: number) {
        return Brand.destroy({ where: { id } });
    }
}
