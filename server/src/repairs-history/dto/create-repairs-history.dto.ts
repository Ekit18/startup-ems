import { IsNumber } from "class-validator";

export class CreateRepairsHistory {
    @IsNumber({}, { message: '$property must be number' })
    userCarId: number;
    @IsNumber({}, { message: '$property must be number' })
    carServiceId: number;
    @IsNumber({}, { message: '$property must be number' })
    carOperationId: number;
}
