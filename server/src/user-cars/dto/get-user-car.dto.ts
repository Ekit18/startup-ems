import { IsNumber, IsNumberString } from "class-validator";

export class GetUserCar {
    @IsNumberString({}, { message: "Must be number" })
    readonly userId: number;
    @IsNumberString({}, { message: "Must be number" })
    readonly carId: number;
}