import{IsString, Length,IsEmail, IsOptional }from "class-validator";
export class UpdateUserDto {
    @IsOptional()
    @IsString({message:"Must be string"})
    @IsEmail({},{message:"Wrong e-mail"})
    email: string;
    @IsOptional()
    @IsString({message:"Must be string"})
    @Length(4, 16, {message:'From 4 to 16 symbols'})
    password: string;
}