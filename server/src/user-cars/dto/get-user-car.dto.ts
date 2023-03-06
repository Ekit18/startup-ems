import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNumberString } from "class-validator";

export class GetUserCar {
    @ApiProperty({ example: "1", description: "User ID" })
    @IsNumberString({}, { message: "Must be number" })
    readonly userId: number;
    @ApiProperty({ example: "1", description: "Car ID" })
    @IsNumberString({}, { message: "Must be number" })
    readonly carId: number;
}