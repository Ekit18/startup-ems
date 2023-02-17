import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, Length, IsEmail, IsNumber, IsOptional } from "class-validator";

export class UpdateCarDto {
    @ApiPropertyOptional({ example: "Octavia", description: "Car model" })
    @IsOptional()
    @IsString({ message: '$property must be string' })
    model: string;
    @IsOptional()

    @ApiPropertyOptional({ example: "Petrol", description: "Car fuel type" })
    @IsString({ message: '$property must be string' })
    fuelType: string;

    @ApiPropertyOptional({ example: "Sedan", description: "Car body type" })
    @IsOptional()
    @IsString({ message: '$property must be string' })
    bodyType: string;

    @ApiPropertyOptional({ example: "2023", description: "Car manufacturing year" })
    @IsOptional()
    @IsNumber({}, { message: "Must be number" })
    year: number;
}