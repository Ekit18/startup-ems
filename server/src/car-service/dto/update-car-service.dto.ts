import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNumber, IsOptional } from "class-validator";

export class UpdateCarServiceDto {
    @ApiPropertyOptional({ example: "The best car service", description: "Name of car service" })
    @IsOptional()
    @IsString({ message: '$property must be string' })
    name: string;

    @ApiProperty({ example: "49.6721819,14.2466009", description: "Coordinates of the car service" })
    @IsOptional()
    @IsString({ message: "$property must be string!" })
    location: string;

    @ApiProperty({ example: "5", description: "Rating of the car service" })
    @IsOptional()
    @IsNumber({}, { message: "$property must be number" })
    rating:number;
}
