import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsBooleanString, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class UpdateStockDTO{
    @ApiProperty({example: "100.15", description:"Price of a part in a shop"})
    @IsOptional()
    @IsNumber({},{ message:"$property must be number!"} )
    price: number;

    @ApiProperty({example: "True", description:"Is that part available in the shop?"})
    @IsOptional()
    @IsBoolean({ message:"$property must be boolean!"} )
    isAvailable: boolean;
}