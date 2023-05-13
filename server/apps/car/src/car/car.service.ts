import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Car, CarDto, GetCarByModelDto, GetCarByBrandIdDto, UpdateCarDto } from "inq-shared-lib";

@Injectable()
export class CarService {
    constructor(@InjectModel(Car) private carRepository: typeof Car) { }

    async createCar(dto: CarDto) {
        const car = await this.carRepository.create(dto);
        return car;
    }

    async getCarById(id: number) {
        const car = await this.carRepository.findOne({ where: { id }, include: { all: true } });
        if (!car) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return car;
    }

    async getCarByIdWithoutIncludeAll(id: number) {
        const car = await this.carRepository.findOne({ where: { id } });
        if (!car) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return car;
    }

    async getAllCarByModel(dto: GetCarByModelDto) {
        const { model } = dto;
        const cars = await this.carRepository.findAll({ where: { model } });
        if (!cars) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return cars;
    }

    async getAllCarsModelsByBrand(dto: GetCarByBrandIdDto) {
        const { brandId } = dto;
        const models = await this.carRepository.findAll({ where: { brandId }, attributes: ["model"], group: ['model'] });
        if (!models) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return models;
    }

    async getAllYearsByBrandAndModel(dto: GetCarByBrandIdDto & GetCarByModelDto) {
        const { brandId, model } = dto;
        const years = await this.carRepository.findAll({ where: { brandId, model }, attributes: ["year"], group: ['year'] });
        if (!years) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return years;
    }

    async getAllCarsByBrandAndModelAndYear(dto: GetCarByBrandIdDto & GetCarByModelDto & Pick<CarDto, 'year'>) {
        const { brandId, model, year } = dto;
        const cars = await this.carRepository.findAll({ where: { brandId, model, year } });
        if (!cars) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return cars;
    }

    async updateCar(id: number, dto: UpdateCarDto) {
        if (!Object.keys(dto).length) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        const car = await this.carRepository.findOne({ where: { id } });
        if (!car) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return Car.update({ ...dto }, { where: { id } });
    }

    async remove(id: number) {
        const car = await this.carRepository.findOne({ where: { id } });
        if (!car) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return Car.destroy({ where: { id } });
    }
}
