import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Brand } from './brand.model';
import { BrandDto } from './dto/brand.dto';

@Injectable()
export class BrandService {
    constructor(@InjectModel(Brand) private brandRepository: typeof Brand) { }

    async createBrand(dto: BrandDto) {      
        const candidate = await this.getBrandByValue(dto);
        if (candidate) {
            throw new HttpException({ message: 'Already exist' }, HttpStatus.BAD_REQUEST);
        }
        const brand = await this.brandRepository.create(dto);
        return brand;
    }
    async getBrandByValue(dto: BrandDto) {
        const brand = await this.brandRepository.findOne({ where: { brand: dto.brand } });
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
