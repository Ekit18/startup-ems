import { IsNumber, IsString } from "class-validator";

export class CreateRoleDto {
    @IsString({message:"Must be string"})
    readonly value: string;
    @IsNumber({},{message:"Must be number"})
    readonly description: string;
}