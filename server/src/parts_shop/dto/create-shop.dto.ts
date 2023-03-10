import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsString } from "class-validator";

export class CreateShopDTO {
    @ApiProperty({ example: "John's parts", description: "Unique shop name" })
    @IsString({ message: "$property must be string!" })
    name: string;
    @ApiProperty({ example: "https://johnparts.com", description: "Shop URL" })
    @IsString({ message: "$property must be string!" })
    siteLink: string;
    @ApiProperty({ example: "49.6721819,14.2466009", description: "Coordinates of the shop" })
    @IsString({ message: "$property must be string!" })
    gpsCoords:string;
}
