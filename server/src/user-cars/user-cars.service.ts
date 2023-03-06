import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CarService } from 'src/car/car.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserCarsDto } from './dto/create-user-cars.dto';
import { GetAllUserCars } from './dto/get-all-user-cars.dto';
import { GetUserCar } from './dto/get-user-car.dto';
import { updateMileage } from './dto/update-mileage.dto';
import { UserCars } from './user-cars.model';

@Injectable()
export class UserCarsService {
    constructor(@InjectModel(UserCars) private userCarsRepository: typeof UserCars, private userService: UsersService, private carService: CarService) { }

    async createUserCar(dto: CreateUserCarsDto) {
        const user = await this.userService.getUserById(dto.userId);
        const car = await this.carService.getCarById(dto.carId);
        if (!user || !car) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        const userCar = await this.userCarsRepository.create(dto);
        return userCar;

    }

    async getAllUserCars(dto: GetAllUserCars) {
        const user = await this.userService.getUserById(dto.userId);
        if (!user) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        const cars = await this.userCarsRepository.findAll({ where: { userId: dto.userId } });
        return cars;
    }

    async getUserCar(dto: GetUserCar) {
        const user = await this.userService.getUserById(dto.userId);
        const checkCar = await this.carService.getCarById(dto.carId);
        if (!user || !checkCar) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        const car = await this.userCarsRepository.findOne({ where: { userId: dto.userId, carId: dto.carId } });
        return car;
    }

    async updateMileage(params: GetUserCar, dto: updateMileage) {
        const user = await this.userService.getUserById(params.userId);
        const car = await this.carService.getCarById(params.carId);
        if (!user || !car) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return UserCars.update({ carMileage: dto.carMileage }, { where: { userId: params.userId, carId: params.carId } });
    }

    async remove(params: GetUserCar) {
        const user = await this.userService.getUserById(params.userId);
        const checkCar = await this.carService.getCarById(params.carId);
        if (!user || !checkCar) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return UserCars.destroy({ where: { userId: params.userId, carId: params.carId } });
    }
}
