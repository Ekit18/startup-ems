import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CarServices } from './car-service.model';
import { CreateCarServiceDto } from './dto/create-car-service.dto';
import { UpdateCarServiceDto } from './dto/update-car-service.dto';

@Injectable()
export class CarServicesServices {
    constructor(@InjectModel(CarServices) private carServiceRepository: typeof CarServices) { }

    async createCarService(dto: CreateCarServiceDto) {
        const carService = await this.carServiceRepository.create(dto);
        return carService;
    }

    async getCarServiceById(id: number) {
        const carService = await this.carServiceRepository.findOne({ where: { id } });
        if (!carService) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return carService;
    }

    updateCarService(id: number, dto: UpdateCarServiceDto) {
        return this.carServiceRepository.update({ ...dto }, { where: { id } });
    }

    remove(id: number) {
        return this.carServiceRepository.destroy({ where: { id } });
    }
}
