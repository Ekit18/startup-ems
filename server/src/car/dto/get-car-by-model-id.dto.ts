import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsEmail, IsNumber, IsOptional, IsNumberString } from "class-validator";

export class GetCarByModelDto {
    @ApiProperty({ example: "Octavia", description: "Car model" })
    @IsString({ message: "Must be string" })
    model: string;
}