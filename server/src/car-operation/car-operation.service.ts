import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CarOperation } from './car-operation.model';
import { CreateCarOperationDto } from './dto/create-car-operation.dto';
import { UpdateCarOperationDto } from './dto/update-car-operation.dto';

@Injectable()
export class CarOperationService {
    constructor(@InjectModel(CarOperation) private carOperationRepository: typeof CarOperation) { }

    async createCarOperation(dto: CreateCarOperationDto) {
        const carOperation = await this.carOperationRepository.create(dto);
        return carOperation;
    }

    async getCarOperationById(id: number) {
        const carOperation = await this.carOperationRepository.findOne({ where: { id } });
        console.log(carOperation);
        if (!carOperation) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return carOperation;
    }

    updateCarOperation(id: number, dto: UpdateCarOperationDto) {
        return this.carOperationRepository.update({ ...dto }, { where: { id } });
    }

    remove(id: number) {
        return this.carOperationRepository.destroy({ where: { id } });
    }
}
