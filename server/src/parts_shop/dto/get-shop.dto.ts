import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class GetShopDTO{
    @ApiProperty({example: "1", description:"Unique shop ID"})
    @IsNumberString({},{message:"$property must be number for GetShopDTO"})
    readonly shopId: number;
}