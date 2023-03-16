import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNumberString, IsString } from "class-validator";

export class SetModelDTO {
    @ApiProperty({ example: "text-davinci-003", description: "AI Model" })
    @IsString({ message: "$property must be string!" })
    model: string;
}
