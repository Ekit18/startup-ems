import { IsString, Length, IsEmail } from "class-validator";
export class BrandDto {
    @IsString({ message: "Must be string" })
    readonly brand: string;
}