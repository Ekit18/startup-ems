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
        let candidateCar = await this.carService.getCarById(getPartsDTO.carId);
        if(!candidateCar){
            throw new HttpException({ message: 'Car with such parts does not exist in the system' }, HttpStatus.BAD_REQUEST)
        }
        return (await this.carService.getCarById(getPartsDTO.carId)).parts;
    }
    async getPartByName(name: string) {
        return this.partRepository.findOne({ where: { name } });
    }
    async createPart(createPartDTO: CreatePartDTO) {
        const candidate = await this.getPartByName(createPartDTO.name)
        if (candidate) {
            throw new HttpException({ message: 'Part is already in the system' }, HttpStatus.BAD_REQUEST)
        }

        const part = await this.partRepository.create({ ...createPartDTO })

        const car = await this.carService.getCarById(createPartDTO.carId)
        await part.$set('cars', [car.id])
        part.cars = [car]
        return part;
    }
    async updatePart(updatePartDTO: UpdatePartDTO) {
        if (Object.keys(updatePartDTO).length == 1) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        try {
            const updateResult = await Part.update({ ...updatePartDTO }, { where: { partId:updatePartDTO.partId } });
            if (updateResult[0] == 0) {
                throw new Error()
            }
            return updateResult
        }
        catch{
            throw new HttpException({ message: "Part doesn't exist or trying to make duplicate names" }, HttpStatus.BAD_REQUEST)
        }
        

    }
    async remove(partId: number) {
        let destroyResult = await Part.destroy({ where: { partId } })
        if(!destroyResult){
            throw new HttpException({message:"No rows were deleted!"},HttpStatus.BAD_REQUEST)
        }
        return destroyResult;
    }







}
