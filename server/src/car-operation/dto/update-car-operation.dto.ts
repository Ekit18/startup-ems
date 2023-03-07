import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCarOperationDto {
    @ApiProperty({ example: "Changing engine", description: "Name of car operation" })
    @IsOptional()
    @IsString({ message: "$property must be string" })
    name: string;
    @ApiProperty({ example: "Strange noise in the engine", description: "Symptom of the malfunction" })
    @IsOptional()
    @IsString({ message: "$property must be string" })
    symptom: string;
    @ApiProperty({ example: "Bought new engine", description: "Solution of the problem" })
    @IsOptional()
    @IsString({ message: "$property must be string" })
    repair: string;
    @ApiProperty({ example: "15000", description: "Price of the operation" })
    @IsOptional()
    @IsNumber({}, { message: "$property must be number" })
    price: number;
}
