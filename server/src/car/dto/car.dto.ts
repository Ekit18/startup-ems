import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsEmail, IsNumber, IsOptional } from "class-validator";

export class CarDto {
    @ApiProperty({ example: "1", description: "Car id" })
    @IsOptional()
    @IsNumber({}, { message: "Must be number" })
    id: number;

    @ApiProperty({ example: "1", description: "Car brand id" })
    @IsNumber({}, { message: "Must be number" })
    brandId: number;

    @ApiProperty({ example: "Octavia", description: "Car model" })
    @IsString({ message: '$property must be string' })
    model: string;

    @ApiProperty({ example: "Petrol", description: "Car fuel type" })
    @IsString({ message: '$property must be string' })
    fuelType: string;

    @ApiProperty({ example: "Sedan", description: "Car body type" })
    @IsString({ message: '$property must be string' })
    bodyType: string;

    @ApiProperty({ example: "2023", description: "Car manufacturing year" })
    @IsNumber({}, { message: "Must be number" })
    year: number;
}