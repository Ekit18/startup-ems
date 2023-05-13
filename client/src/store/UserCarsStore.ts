import { action, makeAutoObservable } from "mobx";
import { addUserCars, changeUserCars, deleteUserCars, fetchUserCars } from "../http/carApi/userCarsApi";

export type UserCarData = {
    bodyType: string
    brand: string
    carMileage: number
    fuelType: string
    id: number
    model: string
    userCarId: number
    year: number
}


export default class UserCarsStore {
    _userCars: Array<UserCarData>
    constructor() {
        this._userCars = []
        makeAutoObservable(this)
    }

    setUserCars(userCars: UserCarData[]) {
        this._userCars = userCars
    }

    get userCars() {
        return this._userCars
    }

    addUserCars(userId: number, carId: number, carMileage: number) {
        return addUserCars(userId, carId, carMileage).then(action((data) => {
            this._userCars.push(data)
        }))
    }

    deleteUserCars(userId: number, userCarId: number) {
        return deleteUserCars(userId, userCarId).then(action(() => {
            const scheduleIndex = this._userCars.findIndex((item) => item.userCarId === userCarId)
            this._userCars.splice(scheduleIndex, 1)
        }))
    }

    changeUserCars(userId: number, carId: number, mileage: number) {
        return changeUserCars(userId, carId, mileage).then(action(() => {
            const userCar = this.findUserCarById(carId)
            console.log(carId, this.findUserCarById(carId), this._userCars)
            if (userCar) {
                userCar.carMileage = mileage
            }
        }))
    }

    findUserCarById(userCarId: number) {
        return this._userCars.find((item) => item.id === userCarId)
    }

    loadUserCars(userId: number) {
        return fetchUserCars(userId).then(action((userCars: UserCarData[]) => {
            this._userCars = userCars
        }))
    }
}
