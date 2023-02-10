import { IsString, Length, IsEmail, IsNumber, IsOptional, IsNumberString } from "class-validator";

export class GetCarByBrandIdDto {
    @IsNumberString({}, { message: "Must be number" })
    brandId:number;
}