import { IsString, Length, IsEmail, IsNumber, IsOptional } from "class-validator";

export class UpdateCarDto {

    @IsOptional()
    @IsString({ message: '$property must be string' })
    model: string;
    @IsOptional()
    @IsString({ message: '$property must be string' })
    fuelType: string;
    @IsOptional()
    @IsString({ message: '$property must be string' })
    bodyType: string;
    @IsOptional()
    @IsNumber({}, { message: "Must be number" })
    year: number;
}