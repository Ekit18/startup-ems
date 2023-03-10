import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class GetCarOperationDto {
    @ApiProperty({ example: "1", description: "ID of the car operation" })
    @IsNumberString({}, { message: "$property must be number" })
    id: number;
}
