import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class GetPartsByShopDTO {
    @ApiProperty({ example: "1", description: "Unique shop ID" })
    @IsNumberString({}, { message: "$property must be number for GetPartsByShopDTO" })
    readonly shopId: number;
}
