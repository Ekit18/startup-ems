import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, Length, IsEmail, IsOptional } from "class-validator";
export class UpdateUserDto {
    @ApiPropertyOptional({ example: 'evgenkitan@gmail.com', description: 'Email of the user' })
    @IsOptional()
    @IsString({ message: "Must be string" })
    @IsEmail({}, { message: "Wrong e-mail" })
    email: string;
    @ApiPropertyOptional({ example: '12345', description: 'Password of the user' })
    @IsOptional()
    @IsString({ message: "Must be string" })
    @Length(4, 16, { message: 'From 4 to 16 symbols' })
    password: string;
}
