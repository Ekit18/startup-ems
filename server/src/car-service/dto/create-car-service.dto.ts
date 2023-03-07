import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateCarServiceDto {
    @ApiProperty({ example: "The best car service", description: "Name of car service" })
    @IsString({ message: "$property must be string" })
    name: string;

    @ApiProperty({ example: "49.6721819,14.2466009", description: "Coordinates of the car service" })
    @IsString({ message: "$property must be string!" })
    location: string;

    @ApiProperty({ example: "5", description: "Rating of the car service" })
    @IsNumber({}, { message: "$property must be number" })
    rating: number;
}
