import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Crashes } from './crashes.model';
import { CreateCrashDTO } from './dto/create-crash.dto';
import { UserCarsService } from 'src/user-cars/user-cars.service';
import { UpdateCrashDTO } from './dto/update-crash.dto';

export interface CrashInfo {
    carMileage: number;
    id: number;
    brand: string;
    model: string;
    fuelType: string;
    bodyType: string;
    year: number;
    description: string;
    location: string;
}

@Injectable()
export class CrashesService {
    constructor(@InjectModel(Crashes) private crashRepository: typeof Crashes, private userCarsRepository: UserCarsService) { }

    async createCrash(dto: CreateCrashDTO) {
        const crash = await this.crashRepository.create(dto);
        return crash;
    }

    async getCrashByUserCarId(userCarId: number): Promise<CrashInfo> {
        const crash = await this.crashRepository.findOne({ where: { userCarId } });
        const car = await this.userCarsRepository.getUserCarById(crash.userCarId);
        return { ...car, description: crash.description, location: crash.location };
    }

    async getAllCrashesWithCars(): Promise<CrashInfo[]> {
        const crashes = await this.crashRepository.findAll();
        const carsCrashes = await Promise.all(crashes.map(async (car) => {
            const carData = await this.userCarsRepository.getUserCarById(car.userCarId);
            return { ...carData, description: car.description, location: car.location };
        }));
        return carsCrashes;
    }

    updateCrash(id: number, params: UpdateCrashDTO) {
        return Crashes.update({ ...params }, { where: { id } });
    }

    removeCrash(id: number) {
        return Crashes.destroy({ where: { id } });
    }

    async getAllUserCrashes(userId: number): Promise<CrashInfo[]> {
        const userCars = await this.userCarsRepository.getAllUserCars(userId);
        const carsCrashInfo = await Promise.all(userCars.map(async (car) => {
            console.log(car.userCarId);
            const crashInfo = await this.getCrashByUserCarId(car.userCarId);
            return { ...car, description: crashInfo.description, location: crashInfo.location };
        }));
        return carsCrashInfo;
    }
}
