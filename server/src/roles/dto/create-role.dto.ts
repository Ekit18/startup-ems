import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateRoleDto {
    @ApiProperty({ example: 'ADMIN', description: 'Name of the role' })
    @IsString({ message: "Must be string" })
    readonly value: string;
    @ApiProperty({ example: 'Person who can administrate this app', description: 'Description of the role' })
    @IsString({ message: "Must be string" })
    readonly description: string;
}
