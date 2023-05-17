import { Injectable, HttpException, HttpStatus, Inject } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CarOperation, RepairsHistory, CreateRepairsHistory, CAR_QUEUE, DeleteRepairsHistoryDto } from "inq-shared-lib";
import { CarOperationService } from "../car-operation/car-operation.service";
import { CarServicesServices } from "../car-service/car-service.service";
import { CarService } from "apps/car/src/car/car.service";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import RepairsHistorySearchService from "../repairs-history-search/repairs-history-search.service";
import { Sequelize, Op } from "sequelize";

export interface CarHistoryByService extends CarService {
    operations: CarOperation[];
}

@Injectable()
export class RepairsHistoryService {
    constructor(@InjectModel(RepairsHistory) private repairsHistoryRepository: typeof RepairsHistory,
        private carServiceRepository: CarServicesServices,
        private carOperationRepository: CarOperationService,
        private repairsHistorySearchService: RepairsHistorySearchService,
        @Inject(CAR_QUEUE) private UserCarClient: ClientProxy) { }

    async create(dto: CreateRepairsHistory) {
        const carService = await this.carServiceRepository.getCarServiceById(dto.carServiceId);
        const carOperation = await this.carOperationRepository.getCarOperationById(dto.carOperationId);
        if (!carService || !carOperation) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        const repairsHistory = await this.repairsHistoryRepository.create(dto);
        console.log("CREATEDCREATEDCREATEDCREATEDCREATEDCREATEDCREATEDCREATED");
        this.repairsHistorySearchService.indexRepairHistory(repairsHistory);
        console.log("CREATEDCREATEDCREATEDCREATEDCREATEDCREATEDCREATEDCREATED");
        return repairsHistory;
    }

    async createFromArray(data: { initialRepairHistoryId: number } & { carOperationIds: number[] } & CreateRepairsHistory) {
        await this.repairsHistoryRepository.update({ isSigned: true }, { where: { id: data.initialRepairHistoryId } });
        const updatedInitialHistory = await this.repairsHistoryRepository.findOne({ where: { id: data.initialRepairHistoryId }, include: { all: true } });
        this.repairsHistorySearchService.update(updatedInitialHistory);
        const result = await Promise.all(data.carOperationIds.map(async (item) => {
            const repairsHistory = await this.create({ ...data, carOperationId: item });
            this.repairsHistorySearchService.indexRepairHistory(repairsHistory);
            return repairsHistory;
        }));
        return result;
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
        const result: CarHistoryByService[] = carHistory.reduce((acc, obj) => {
            const existingObj = acc.find((item) => item.id === obj.carServiceId);
            const service = servicesMap.get(obj.carServiceId);
            const operation = operationsMap.get(obj.carOperationId);
            return existingObj
                ? (existingObj.operations.push({ ...operation.get(), createdAt: obj.createdAt, isSigned: obj.isSigned, repairsHistoryId: obj.id }), acc)
                : [...acc, { ...service.get(), operations: [{ ...operation.get(), createdAt: obj.createdAt, isSigned: obj.isSigned, repairsHistoryId: obj.id }] }];
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

    async getAllUnsignedCarServiceHistory(carServiceId: number) {
        const carHistory = await this.repairsHistoryRepository.findAll({ where: { carServiceId, isSigned: false }, include: { all: true } });
        const result = await Promise.all(carHistory.map(async (item) => {
            const userCar = await lastValueFrom(this.UserCarClient.send({ role: "user-cars", cmd: "getUserCarForCrashInfo" }, item.userCarId));
            return {
                ...userCar,
                ...item.get()
            };
        }));
        return result;
    }

    async searchForRepairsHistory(text: string) {
        const results = await this.repairsHistorySearchService.search(Number(text));
        const ids = results.map((result) => result.id);
        if (!ids.length) {
            return [];
        }
        return this.repairsHistoryRepository.findAll({
            where: {
              id: {
                [Op.in]: ids
              }
            }
          });
    }


    remove(dto: DeleteRepairsHistoryDto) {
        const deleteResponse = RepairsHistory.destroy({ where: { ...dto } });
        if (!deleteResponse) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        this.repairsHistorySearchService.remove(dto);
    }
}
