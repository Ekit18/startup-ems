import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsEmail } from "class-validator";
export class BrandDto {
    @ApiProperty({example:'Aston Martin', description:'Name of the brand'})
    @IsString({ message: "Must be string" })
    readonly brand: string;
}