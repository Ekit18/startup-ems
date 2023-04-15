import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNumberString, IsOptional, IsString, IsUrl } from "class-validator";

export class UpdateCrashDTO {
    @ApiProperty({ example: "Yokohama", description: "Part brand" })
    @IsOptional()
    @IsNumber({}, { message: "$property must be string!" })
    id: number;
    @ApiProperty({ example: "Yokohama", description: "Part brand" })
    @IsOptional()
    @IsNumber({}, { message: "$property must be string!" })
    userCarId: number;
    @ApiProperty({ example: "W.Drive V905 215/65 R16 98H", description: "Unique part factory name" })
    @IsOptional()
    @IsString({ message: "$property must be string!" })
    description: string;
    @ApiProperty({ example: "Tire", description: "Part type" })
    @IsOptional()
    @IsString({ message: "$property must be string!" })
    location: string;
}
