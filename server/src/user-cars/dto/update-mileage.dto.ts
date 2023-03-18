import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class updateMileage {
    @ApiProperty({ example: "150000", description: "Car mileage" })
    @IsNumber({}, { message: "Must be number" })
    readonly carMileage: number;
}
