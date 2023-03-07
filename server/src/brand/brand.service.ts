import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        if (!brand) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return brand;
    }
    async getAllBrands() {
        const brands = await this.brandRepository.findAll();
        return brands;
    }
    updateBrand(id: number, brandDto: BrandDto) {
        return Brand.update({ brand: brandDto.brand }, { where: { id } });
    }
    remove(id: number) {
        return Brand.destroy({ where: { id } });
    }
}
