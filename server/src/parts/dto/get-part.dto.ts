import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class GetPartsDTO {
    @ApiProperty({ example: "1", description: "Car ID to which parts belongs to" })
    @IsNumberString({}, { message: "$property must be string for PartDTO" })
    readonly carId: number;
}
