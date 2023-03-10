import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class GetStockDTO {
    @ApiProperty({ example: "1", description: "Unique shop ID" })
    @IsNumberString({}, { message: "$property must be number for GetStockDTO" })
    readonly shopId: number;

    @ApiProperty({ example: "1", description: "Unique part ID" })
    @IsNumberString({}, { message: "$property must be number for GetStockDTO" })
    readonly partId: number;
}
