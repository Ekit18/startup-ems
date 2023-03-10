import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsBooleanString, IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateStockDTO {
    @ApiProperty({ example: "28", description: "Shop ID in which part is being sold" })
    @IsNumber({}, { message: "$property must be number!" })
    shopId: number;
    @ApiProperty({ example: "1", description: "Part ID which is being sold in a shop" })
    @IsNumber({}, { message: "$property must be number!" })
    partId: number;
    @ApiProperty({ example: "100.15", description: "Price of a part in a shop" })
    @IsNumber({}, { message: "$property must be number!" })
    price:number;
    @IsBoolean({ message: "$property must be boolean!" })
    @ApiProperty({ example: "True", description: "Is that part available in the shop?" })
    isAvailable: boolean;
}
