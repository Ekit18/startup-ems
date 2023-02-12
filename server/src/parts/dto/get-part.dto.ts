import { IsNumberString } from "class-validator";

export class GetPartsDTO{
    @IsNumberString({},{message:"$property must be string for PartDTO"})
    readonly carId: string;
}