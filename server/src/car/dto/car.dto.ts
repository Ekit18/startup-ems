import { IsString, Length, IsEmail, IsNumber, IsOptional } from "class-validator";

export class CarDto {

    @IsOptional()
    @IsNumber({}, { message: "Must be number" })
    id:number;

    @IsNumber({}, { message: "Must be number" })
    brandId:number;

    @IsString({ message: '$property must be string' })
    model: string;

    @IsString({ message: '$property must be string' })
    fuelType: string;

    @IsString({ message: '$property must be string' })
    bodyType: string;

    @IsNumber({}, { message: "Must be number" })
    year: number;
}