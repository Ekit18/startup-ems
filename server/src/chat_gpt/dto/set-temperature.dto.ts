import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNumberString, IsString } from "class-validator";

export class SetTemperatureDTO {
    @ApiProperty({ example: "text-davinci-003", description: "AI Model" })
    @IsString({ message: "$property must be string!" })
    temperature: number;
}
