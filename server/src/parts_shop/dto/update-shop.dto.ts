import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsOptional, IsString } from "class-validator";

export class UpdateShopDTO{
    @ApiProperty({example: "John's parts", description:"Unique shop name"})
    @IsOptional()
    @IsString({ message:"$property must be string!"} )
    name: string;

    @ApiProperty({example: "https://johnparts.com", description:"Shop URL"})
    @IsOptional()
    @IsString({ message:"$property must be string!"} )
    siteLink: string;

    @ApiProperty({example: "49.6721819,14.2466009", description:"Coordinates of the shop"})
    @IsOptional()
    @IsString({ message:"$property must be string!"} )
    gpsCoords:string;
}