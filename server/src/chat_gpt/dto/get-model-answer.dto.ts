import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class GetModelAnswerDTO {
    @ApiProperty({ example: "How to cook soup", description: "AI prompt" })
    @IsString({ message: "$property must be string!" })
    question: string;
    @ApiProperty({ example: "text-davinci-003", description: "AI model to use only for that prompt" })
    @IsOptional()
    @IsString({ message: "$property must be string!" })
    useOncemodel: string;
    @ApiProperty({ example: "How to cook soup", description: "AI temperature" })
    @IsString({ message: "$property must be string!" })
    @IsOptional()
    useOnceTemperature: number;
    @ApiProperty({ example: "How to cook soup", description: "AI temperature" })
    @IsString({ message: "$property must be string!" })
    @IsOptional()
    useOnceMaxTokens: number;
}
