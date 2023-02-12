
import { ValidatorException } from 'src/exception/validation.exception';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePartDTO } from './dto/create-part.dto';
import { GetPartsDTO } from './dto/get-part.dto';
import { UpdatePartDTO } from './dto/update-part.dto';
import { Part } from './parts.model';

@Injectable()
export class PartsService {
    constructor(@InjectModel(Part) private partRepository: typeof Part){}

    async getAllPartsByCarID(getPartsDTO: GetPartsDTO) {
        const {carId} = getPartsDTO;
        const parts = await this.partRepository.findAll({where:{carId}});

        if(!parts){
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return parts;
    }
    async createPart(createPartDTO: CreatePartDTO) {
        const part = await this.partRepository.create({...createPartDTO})
        return part;
    }
    updatePart(partId:number, updatePartDTO: UpdatePartDTO) {
        if(!Object.keys(updatePartDTO).length) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return Part.update({ ...updatePartDTO }, { where: { partId } });
    }
    remove(partId: number) {
        return Part.destroy({ where: { partId } })
    }
    
    
    
    



}
