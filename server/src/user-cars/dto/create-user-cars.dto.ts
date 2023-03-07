import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateUserCarsDto {
    @ApiProperty({ example: "1", description: "User ID" })
    @IsNumber({}, { message: "$property must be number" })
    readonly userId: number;
    @ApiProperty({ example: "1", description: "Car ID" })
    @IsNumber({}, { message: "$property must be number" })
    readonly carId: number;
    @ApiProperty({ example: "150000", description: "Car mileage" })
    @IsNumber({}, { message: "$property must be number" })
    readonly carMileage: number;
}