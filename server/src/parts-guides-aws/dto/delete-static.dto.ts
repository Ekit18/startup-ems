import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsString } from "class-validator";

export class DeleteStaticDTO {
    @ApiProperty({ example: "1", description: "Unique static key (name in S3)" })
    @IsString({ message: "$property must be string for DeleteStaticDTO" })
    readonly key: string;
}
