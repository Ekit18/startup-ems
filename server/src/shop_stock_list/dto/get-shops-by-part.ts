import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class GetShopsByPartDTO {
    @ApiProperty({ example: "1", description: "Unique part ID" })
    @IsNumberString({}, { message: "$property must be number for GetPartsByShopDTO" })
    readonly partId: number;
}
