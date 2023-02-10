import { IsString, Length, IsEmail, IsNumber, IsOptional, IsNumberString } from "class-validator";

export class GetCarByModelDto {
    @IsString({ message: "Must be string" })
    model:string;
}