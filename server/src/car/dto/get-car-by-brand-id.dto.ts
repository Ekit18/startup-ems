import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsEmail, IsNumber, IsOptional, IsNumberString } from "class-validator";

export class GetCarByBrandIdDto {
    @ApiProperty({ example: "1", description: "Existing brand id" })
    @IsNumberString({}, { message: "Must be number" })
    brandId: number;
}