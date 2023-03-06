import { IsNumber } from "class-validator";

export class updateMileage{
    @IsNumber({}, { message: "Must be number" })
    readonly carMileage:number;
}