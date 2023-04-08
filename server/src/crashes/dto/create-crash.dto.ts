import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNumberString, IsString, IsUrl } from "class-validator";

export class CreateCrashDTO {
    @ApiProperty({ example: "Yokohama", description: "Part brand" })
    @IsString({ message: "$property must be string!" })
    userCarId: number;
    @ApiProperty({ example: "W.Drive V905 215/65 R16 98H", description: "Unique part factory name" })
    @IsString({ message: "$property must be string!" })
    description: string;
    @ApiProperty({ example: "Tire", description: "Part type" })
    @IsString({ message: "$property must be string!" })
    location: string;
}
