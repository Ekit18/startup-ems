import { CarService } from './../car/car.service';

import { ValidatorException } from 'src/exception/validation.exception';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePartDTO } from './dto/create-part.dto';
import { GetPartsDTO } from './dto/get-part.dto';
import { UpdatePartDTO } from './dto/update-part.dto';
import { Part } from './parts.model';
import { CarsParts } from './cars-parts.model';
import { Car } from 'src/car/car.model';

@Injectable()
export class PartsService {
    constructor(@InjectModel(Part) private partRepository: typeof Part,
        private carService: CarService,
        @InjectModel(CarsParts) private carsParts: typeof CarsParts) { }

    async getAllPartsByCarID(getPartsDTO: GetPartsDTO) {
        // const {carId} = getPartsDTO;
        // const carParts = await this.carRepository.findOne({where:{id:carId},include:{all:true}})
        // if(!carParts){
        //     throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        // }
        // return carParts;
        return (await this.carService.getCarById(getPartsDTO.carId)).parts;
    }
    async getPartByName(name: string) {
        return this.partRepository.findOne({ where: { name } });
    }
    async createPart(createPartDTO: CreatePartDTO) {
        const candidate = this.getPartByName(createPartDTO.name)
        if (!candidate) {
            throw new HttpException({ message: 'Part is already in the system' }, HttpStatus.BAD_REQUEST)
        }

        const part = await this.partRepository.create({ ...createPartDTO })

        const car = await this.carService.getCarById(createPartDTO.carId)
        await part.$set('cars', [car.id])
        part.cars = [car]
        part.$add
        return part;
    }
    async updatePart(partId: number, updatePartDTO: UpdatePartDTO) {
        if (!Object.keys(updatePartDTO).length) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        try {
            const updateResult = await Part.update({ ...updatePartDTO }, { where: { partId } });
            if (updateResult[0] == 0) {
                throw new HttpException({ message: "No rows affected by the update" }, HttpStatus.BAD_REQUEST)
            }
            return updateResult
        }
        catch{
            throw new HttpException({ message: "Can't update a row to make it with already existing name" }, HttpStatus.BAD_REQUEST)
        }
        

    }
    // isUniquePart(updatePartDTO: UpdatePartDTO){
    //     let partFromTable = this.partRepository.findOne({where:{name:updatePartDTO.name}})
    //     return partFromTable ? false : true
    // }
    remove(partId: number) {
        return Part.destroy({ where: { partId } })
    }







}
