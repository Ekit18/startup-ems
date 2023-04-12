import { Car } from './../car/car.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Crashes } from './crashes.model';
import { CreateCrashDTO } from './dto/create-crash.dto';
import { UserCarsDataWithUserCarId, UserCarsService } from 'src/user-cars/user-cars.service';
import { UpdateCrashDTO } from './dto/update-crash.dto';

// Changed from UserCarsData to UserCarsDataWithUserCarId because return object of getAllUserCrashes() corresponds to it,
// and due to additional userCarId field it couldn't relate to CrashInfo and hence was returned as object of unknown type
export interface CrashInfo extends UserCarsDataWithUserCarId {
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

    async getCrashByUserCarId(userCarId: number): Promise<CrashInfo | null> {
        // eslint-disable-next-line prefer-template
        console.log("\n\n\nHERE IS USERCARID: " + userCarId + "\n\n\n");
        const crash = await this.crashRepository.findOne({ where: { userCarId } });
        if (!crash) { // may return null if user's car is not broken at the moment
            return null;
        }
        // eslint-disable-next-line prefer-template
        console.log(`\n\n\nHERE IS CRASH OF USERCARID ${userCarId}: ` + crash + "\n\n\n");
        const car = await this.userCarsRepository.getUserCarById(crash.userCarId);
        return { ...car, description: crash.description, location: crash.location, userCarId };
    }

    async getAllCrashesWithCars(): Promise<CrashInfo[]> {
        const crashes = await this.crashRepository.findAll();
        const carsCrashes = await Promise.all(crashes.map(async (car) => {
            const carData = await this.userCarsRepository.getUserCarById(car.userCarId);
            return { ...carData, description: car.description, location: car.location, userCarId: car.userCarId };
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
        const userCars: UserCarsDataWithUserCarId[] = await this.userCarsRepository.getAllUserCars(userId);
        const carsCrashInfo = await Promise.all(userCars.map(async (car) => {
            const crashInfo = await this.getCrashByUserCarId(car.userCarId);
            if (!crashInfo) {
                return null;
            }
            return { ...car, description: crashInfo.description, location: crashInfo.location };
        }));
        console.log("ALL USER CRASHES:\n\n");
        carsCrashInfo.forEach((crash) => console.log(`${crash}\n`));
        console.log("\n\n");
        return carsCrashInfo.filter((crashInfo) => Boolean(crashInfo));
    }
}
