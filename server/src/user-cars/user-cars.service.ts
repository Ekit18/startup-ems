import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';
import { CreateUserCarsDto } from './dto/create-user-cars.dto';
import { GetAllUserCars } from './dto/get-all-user-cars.dto';
import { GetUserCar } from './dto/get-user-car.dto';
import { updateMileage } from './dto/update-mileage.dto';
import { UserCars } from './user-cars.model';

@Injectable()
export class UserCarsService {
    constructor(@InjectModel(UserCars) private userCarsRepository: typeof UserCars) { }

    async createUserCar(dto: CreateUserCarsDto) {
        const userCar = await this.userCarsRepository.create(dto);
        return userCar;
    }

    async getAllUserCars(dto: GetAllUserCars) {
        const cars = await this.userCarsRepository.findAll({ where: { userId: dto.userId } });
        return cars;
    }

    async getUserCar(dto: GetUserCar) {
        const car = await this.userCarsRepository.findOne({ where: { userId: dto.userId, carId: dto.carId } });
        return car;
    }

    async updateMileage(params:GetUserCar, dto:updateMileage){
        return UserCars.update({ carMileage: dto.carMileage }, { where: { userId: params.userId, carId:params.carId } });
    }

    async remove(params:GetUserCar){
        return UserCars.destroy({ where: { userId: params.userId, carId:params.carId  } });
    }
}
