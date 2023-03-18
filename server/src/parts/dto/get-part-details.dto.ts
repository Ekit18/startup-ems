import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNumberString } from "class-validator";

export class GetPartDetailsDTO {
    @ApiProperty({ example: "1", description: "Part ID" })
    @IsNumberString({}, { message: "$property must be number for PartDTO" })
    readonly partId: number;
}
