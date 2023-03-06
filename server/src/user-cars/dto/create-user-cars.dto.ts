import { IsNumber } from "class-validator";

export class CreateUserCarsDto {
    @IsNumber({}, { message: "Must be number" })
    readonly userId: number;
    @IsNumber({}, { message: "Must be number" })
    readonly carId: number;
    @IsNumber({}, { message: "Must be number" })
    readonly carMileage: number;
}