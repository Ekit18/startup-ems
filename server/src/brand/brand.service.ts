import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Brand } from './brand.model';
import { BrandDto } from './dto/brand.dto';
@Injectable()
export class BrandService {
    constructor(@InjectModel(Brand) private brandRepository: typeof Brand){}
    async createBrand(dto:BrandDto){
        const brand = await this.brandRepository.create(dto);
        return brand;
    }
    async getBrandByValue(value:string){
        const brand = await this.brandRepository.findOne({where:{brand:value}, include:{all:true}});
        return brand;
    }
    async getAllBrands(){
        const brands = await this.brandRepository.findAll({include: {all: true}});
        return brands;
    }
    async updateBrand(id:number, brandDto:BrandDto){
       return Brand.update({brand:brandDto.brand},{where:{id:id}});
    }
    async remove(id:number){
       return Brand.destroy({where:{id}});
    }
}
