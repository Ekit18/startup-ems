import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CarOperation } from 'src/car-operation/car-operation.model';
import { CarOperationService } from 'src/car-operation/car-operation.service';
import { CarServicesServices } from 'src/car-service/car-service.service';
import { CreateRepairsHistory } from './dto/create-repairs-history.dto';
import { RepairsHistory } from './repairs-history.model';

export interface CarHistoryByService {
    operations: CarOperation[];
    id: number;
    name: string;
    location: string;
    rating: number;
}

@Injectable()
export class RepairsHistoryService {
    constructor(@InjectModel(RepairsHistory) private repairsHistoryRepository: typeof RepairsHistory,
        private carServiceRepository: CarServicesServices,
        private carOperationRepository: CarOperationService) { }

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
        const services = await Promise.all([...new Set(carHistory.map((item) => item.carServiceId))].map(async (history) => {
            const service = await this.carServiceRepository.getCarServiceById(history);
            return service;
        }));
        const operations = await Promise.all([...new Set(carHistory.map((item) => item.carOperationId))].map(async (history) => {
            const operation = await this.carOperationRepository.getCarOperationById(history);
            return operation;
        }));
        const servicesMap = new Map(services.map((item) => [item.id, item]));
        const operationsMap = new Map(operations.map((item) => [item.id, item]));
        const result = carHistory.reduce((acc, obj) => {
            const existingObj = acc.find((item) => item.id === obj.carServiceId);
            const service = servicesMap.get(obj.carServiceId);
            const operation = operationsMap.get(obj.carOperationId);
            return existingObj
                ? (existingObj.operations.push({ ...operation.get(), createdAt: obj.createdAt }), acc)
                : [...acc, { ...service.get(), operations: [{ ...operation.get(), createdAt: obj.createdAt }] }];
        }, []);
        return result;
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
