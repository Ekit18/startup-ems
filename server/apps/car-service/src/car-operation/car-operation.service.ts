import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CarOperation, CreateCarOperationDto, UpdateCarOperationDto } from "inq-shared-lib";

@Injectable()
export class CarOperationService {
    constructor(@InjectModel(CarOperation) private carOperationRepository: typeof CarOperation) { }

    async createCarOperation(dto: CreateCarOperationDto) {
        const carOperation = await this.carOperationRepository.create(dto);
        return carOperation;
    }

    async getCarOperationById(id: number) {
        const carOperation = await this.carOperationRepository.findOne({ where: { id } });
        if (!carOperation) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return carOperation;
    }

    async getAllCarOperationById() {
        const carOperations = await this.carOperationRepository.findAll();
        return carOperations;
    }

    updateCarOperation(id: number, dto: UpdateCarOperationDto) {
        return this.carOperationRepository.update({ ...dto }, { where: { id } });
    }

    remove(id: number) {
        return this.carOperationRepository.destroy({ where: { id } });
    }
}
