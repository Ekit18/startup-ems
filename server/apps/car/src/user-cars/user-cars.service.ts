// export interface UserCarsData {
//     carMileage: typeof UserCars.prototype.carMileage;
//     id: number; // id of row in cars
//     brand: string; // will be got from compound request
//     model: typeof Car.prototype.model;
//     fuelType: typeof Car.prototype.fuelType;
//     bodyType: typeof Car.prototype.bodyType;
//     year: typeof Car.prototype.year;

import { Injectable, HttpException, HttpStatus, Inject } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UsersService } from "apps/auth/src/users/users.service";
import { CarCreationAttrs, UserCarsCreationAttrs, UserCars, User, CreateUserCarsDto, GetUserCar, updateMileage, AUTH_QUEUE } from "inq-shared-lib";
import { BrandService } from "../brand/brand.service";
import { CarService } from "../car/car.service";
import { lastValueFrom } from "rxjs";
import { ClientProxy } from "@nestjs/microservices";

// }
export interface UserCarsData extends Omit<CarCreationAttrs, 'brandId'>, Pick<UserCarsCreationAttrs, 'carMileage'> {
    // Without those extensions, it would be boilerplate/hard-code
    id: number; // id of row in cars
    brand: string; // will be got from compound request
}

export interface UserCarsDataWithUserCarId extends UserCarsData {
    userCarId: typeof UserCars.prototype.id;
    user: typeof User.prototype.email;
}

@Injectable()
export class UserCarsService {
    constructor(@InjectModel(UserCars) private userCarsRepository: typeof UserCars,
        @Inject(AUTH_QUEUE) private UserClient: ClientProxy,
        private carService: CarService, private brandService: BrandService) { }

    async createUserCar(dto: CreateUserCarsDto) {
        const user = await lastValueFrom(this.UserClient.send({ role: "user", cmd: "findUserById" }, dto.userId));
        const car = await this.carService.getCarById(dto.carId);
        if (!user || !car) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        const userCar = await this.userCarsRepository.create(dto);
        return userCar;
    }

    async getAllUserCars(userId: number): Promise<UserCarsDataWithUserCarId[]> {
        const user = await lastValueFrom(this.UserClient.send({ role: "user", cmd: "findUserById" }, userId));
        if (!user) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        const userCars = await this.userCarsRepository.findAll({ where: { userId } });
        const cars = await Promise.all(userCars.map(async (car) => {
            const carData = await this.carService.getCarByIdWithoutIncludeAll(car.carId);
            const brand = await this.brandService.getBrandById(carData.get().brandId);
            delete carData.get().brandId;
            return { ...carData.get(), brand: brand.brand, carMileage: car.carMileage, userCarId: car.id, user: user.email, };
        }
        ));
        console.log(`\nUSER EMAIL: ${user.email}\n`);
        return cars;
    }
    async getUserCarForCrashInfo(userCarId: number): Promise<UserCarsDataWithUserCarId> {
        const userCar = await this.userCarsRepository.findOne({ where: { id: userCarId } });
        const carData = await this.carService.getCarByIdWithoutIncludeAll(userCar.carId);
        const brand = await this.brandService.getBrandById(carData.get().brandId);
        delete carData.get().brandId;

        const user = await await lastValueFrom(this.UserClient.send({ role: "user", cmd: "findUserById" }, userCar.userId));

        return { ...carData.get(), brand: brand.brand, carMileage: userCar.carMileage, userCarId: userCar.id, user: user.email, };
    }

    async getAllUserIds(): Promise<number[]> {
        const userIds = await await this.userCarsRepository.findAll({ attributes: ['userId'], group: 'userId' });
        console.log("USERIDS: ");
        console.log(userIds);
        return userIds.map((userCar) => userCar.dataValues.userId);
    }

    async getUserCar(dto: GetUserCar): Promise<UserCarsData> {
        const user = await await lastValueFrom(this.UserClient.send({ role: "user", cmd: "findUserById" }, dto.userId));
        const checkCar = await this.carService.getCarById(dto.carId);
        if (!user || !checkCar) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        const car = await this.userCarsRepository.findOne({ where: { userId: dto.userId, carId: dto.carId } });
        const carInfo = await this.carService.getCarByIdWithoutIncludeAll(car.carId);
        const brand = await this.brandService.getBrandById(carInfo.get().brandId);
        delete carInfo.get().brandId;
        return { ...carInfo.get(), brand: brand.brand, carMileage: car.carMileage };
    }

    updateMileage(params: GetUserCar, dto: updateMileage) {
        return UserCars.update({ carMileage: dto.carMileage }, { where: { userId: params.userId, carId: params.carId } });
    }

    remove(params: GetUserCar) {
        return UserCars.destroy({ where: { userId: params.userId, carId: params.carId } });
    }

    async getUserCarById(id: number): Promise<UserCarsData> {
        const userCar = await this.userCarsRepository.findOne({ where: { id } });
        const user = await await lastValueFrom(this.UserClient.send({ role: "user", cmd: "findUserById" }, userCar.userId));
        const checkCar = await this.carService.getCarById(userCar.carId);
        if (!user || !checkCar) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        const carInfo = await this.carService.getCarByIdWithoutIncludeAll(userCar.carId);
        const brand = await this.brandService.getBrandById(carInfo.get().brandId);
        delete carInfo.get().brandId;
        return { ...carInfo.get(), brand: brand.brand, carMileage: userCar.carMileage };
    }

    // async getUserByUserCarId(userId: number) { ?????
    //     const userCar = await this.userCarsRepository.findOne({ where: { userId } });
    //     return userCar;
    // }
}
