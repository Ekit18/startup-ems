import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class GetCarServiceDto {
    @ApiProperty({ example: "1", description: "ID of the car service" })
    @IsNumberString({}, { message: "$property must be number" })
    id: number;
}
