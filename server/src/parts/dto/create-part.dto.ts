import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNumberString, IsString, IsUrl } from "class-validator";

export class CreatePartDTO {
    @ApiProperty({ example: "Yokohama", description: "Part brand" })
    @IsString({ message: "$property must be string!" })
    brand: string;
    @ApiProperty({ example: "W.Drive V905 215/65 R16 98H", description: "Unique part factory name" })
    @IsString({ message: "$property must be string!" })
    name: string;
    @ApiProperty({ example: "Tire", description: "Part type" })
    @IsString({ message: "$property must be string!" })
    type:string;
    @ApiProperty({ example: "1", description: "Car ID to which that part belongs to" })
    @IsNumberString({}, { message: "$property must be numeric string!" })
    carId:number;
}
