import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsOptional, IsString } from "class-validator";

export class UpdatePartDTO{
    @ApiProperty({example: "Yokohama", description:"Part brand"})
    @IsOptional()
    @IsString({ message:"$property must be string!"} )
    brand: string;
    @ApiProperty({example: "W.Drive V905 215/65 R16 98H", description:"Unique part factory name"})
    @IsOptional()
    @IsString({ message:"$property must be string!"} )
    name: string;
    @ApiProperty({example: "Tire", description:"Part type"})
    @IsOptional()
    @IsString({ message:"$property must be string!"} )
    type:string;
    @ApiProperty({example: "7", description:"Part ID to update"})
    @IsNumberString({},{message:"$property must be numeric for UpdatePartDTO"})
    partId:number;
}