import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {
    @ApiProperty({ example: 'ADMIN', description: 'Name of the role' })
    @IsString({ message: '$property must be string' })
    readonly value:string;
    @ApiProperty({ example: '1', description: 'ID of the user' })
    @IsNumber({}, { message: '$property must be number' })
    readonly userId:number;
}
