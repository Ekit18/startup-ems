import { IsNumber, IsNumberString } from "class-validator";

export class GetAllUserCars {
    @IsNumberString({}, { message: "Must be number" })
    readonly userId: number;
}