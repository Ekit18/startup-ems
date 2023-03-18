import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNumberString, IsString } from "class-validator";

export class SetMaxTokensDTO {
    @ApiProperty({ example: "text-davinci-003", description: "AI Model" })
    @IsNumber({}, { message: "$property must be number!" })
    maxTokens: number;
}
