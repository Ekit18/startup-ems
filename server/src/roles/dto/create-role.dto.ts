import { IsNumber, IsString } from "class-validator";

export class CreateRoleDto {
    @IsString({ message: "Must be string" })
    readonly value: string;
    @IsString({ message: "Must be string" })
    readonly description: string;
}