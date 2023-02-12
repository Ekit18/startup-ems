import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Car } from './car.model';
import { CarDto } from './dto/car.dto';
import { GetCarByBrandIdDto } from './dto/get-car-by-brand-id.dto';
import {  GetCarByModelDto } from './dto/get-car-by-model-id.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarService {
    constructor(@InjectModel(Car) private carRepository: typeof Car) { }

    async createCar(dto: CarDto) {
        const car = await this.carRepository.create(dto);
        return car;
    }

    async getCarById(id:number) {
        const car = await this.carRepository.findOne({ where: { id },include:{all:true}});
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


    async updateCar(id: number, dto: UpdateCarDto) {
        if(!Object.keys(dto).length) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return Car.update({ ...dto }, { where: { id: id } });
    }

    async remove(id: number) {
        return Car.destroy({ where: { id } });
    }



}
