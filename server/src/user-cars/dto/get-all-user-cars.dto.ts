import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNumberString } from "class-validator";

export class GetAllUserCars {
    @ApiProperty({ example: "1", description: "User ID" })
    @IsNumberString({}, { message: "Must be number" })
    readonly userId: number;
}