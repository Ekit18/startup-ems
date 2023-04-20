
// Changed from UserCarsData to UserCarsDataWithUserCarId because return object of getAllUserCrashes() corresponds to it,

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserCarsDataWithUserCarId, UserCarsService } from "apps/car/src/user-cars/user-cars.service";
import { Crashes, CreateCrashDTO, UpdateCrashDTO } from "inq-shared-lib";

// and due to additional userCarId field it couldn't relate to CrashInfo and hence was returned as object of unknown type
export interface CrashInfo extends UserCarsDataWithUserCarId {
    description?: string;
    location?: string;
    date: Date;
}

@Injectable()
export class CrashesService {
    constructor(@InjectModel(Crashes) private crashRepository: typeof Crashes, private userCarsRepository: UserCarsService) { }

    async createCrash(dto: CreateCrashDTO) {
        const crash = await this.crashRepository.create(dto);
        return crash;
    }

    async getCrashByUserCarId(userCarId: number): Promise<Pick<CrashInfo, 'description' | 'location' | 'date'> | null> {
        const crash = await this.crashRepository.findOne({ where: { userCarId } });
        if (!crash) { // may return null if user's car is not broken at the moment
            return null;
        }
        // const car = await this.userCarsRepository.getUserCarById(crash.userCarId);
        // ?? Car info is already in car (line `userCars.map(async (car)` )
        return { description: crash.description, location: crash.location, date: crash.createdAt };
    }

    // async getAllCrashesWithCars(): Promise<CrashInfo[]> {
    //     const crashes = await this.crashRepository.findAll();
    //     const carsCrashes = await Promise.all(crashes.map(async (car) => {
    //         const carData = await this.userCarsRepository.getUserCarById(car.userCarId);
    //         return { ...carData, description: car.description, location: car.location, userCarId: car.userCarId };
    //     }));
    //     return carsCrashes;
    // }

    updateCrash(id: number, params: UpdateCrashDTO) {
        return Crashes.update({ ...params }, { where: { id } });
    }

    removeCrash(userCarId: number) {
        return Crashes.destroy({ where: { userCarId } });
    }

    async getAllUserCrashes(userId: number): Promise<(CrashInfo | UserCarsDataWithUserCarId)[]> {
        const userCars: UserCarsDataWithUserCarId[] = await this.userCarsRepository.getAllUserCars(userId);
        const carsCrashInfo = await Promise.all(userCars.map(async (car) => {
            const crashInfo = await this.getCrashByUserCarId(car.userCarId);
            if (!crashInfo) {
                return { ...car }; // User's car data will still be used in crash addition form, where list of all user cars will be needed
            }
            return { ...car, ...crashInfo } as CrashInfo;
        }));
        // console.log("ALL USER CRASHES:\n");
        // carsCrashInfo.forEach((crash: CrashInfo) => {
        //     console.log(crash.userCarId);
        //     console.log(crash.description);
        // });
        // console.log("\n");
        return carsCrashInfo;
    }
    async getUserCrash(userCarId: number): Promise<CrashInfo> {
        const userCar: UserCarsDataWithUserCarId = await this.userCarsRepository.getUserCarForCrashInfo(userCarId);
        const crashInfo = await this.getCrashByUserCarId(userCar.userCarId);
        return { ...userCar, ...crashInfo } as CrashInfo;
    }
}
