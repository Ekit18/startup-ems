import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CarOperationService } from 'src/car-operation/car-operation.service';
import { CarServicesServices } from 'src/car-service/car-service.service';
import { CreateRepairsHistory } from './dto/create-repairs-history.dto';
import { RepairsHistory } from './repairs-history.model';

@Injectable()
export class RepairsHistoryService {
    constructor(@InjectModel(RepairsHistory) private repairsHistoryRepository: typeof RepairsHistory, private carServiceRepository: CarServicesServices, private carOperationRepository: CarOperationService) { }

    async create(dto: CreateRepairsHistory) {
        const carService = await this.carServiceRepository.getCarServiceById(dto.carServiceId);
        const carOperation = await this.carOperationRepository.getCarOperationById(dto.carOperationId);
        if (!carService || !carOperation) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        const repairsHistory = await this.repairsHistoryRepository.create(dto);
        return repairsHistory;
    }

    async getAllCarHistory(userCarId: number) {
        const carHistory = await this.repairsHistoryRepository.findAll({ where: { userCarId }, include: { all: true } });
        if (!carHistory) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return carHistory;
    }

    async getAllCarServiceHistory(carServiceId: number) {
        const carHistory = await this.repairsHistoryRepository.findAll({ where: { carServiceId }, include: { all: true } });
        if (!carHistory) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return carHistory;
    }

    remove(dto: CreateRepairsHistory) {
        return RepairsHistory.destroy({ where: { ...dto } });
    }
}
