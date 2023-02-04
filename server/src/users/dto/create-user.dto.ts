import{IsString, Length,IsEmail }from "class-validator";
export class CreateUserDto {
    @IsString({message:"Must be string"})
    @IsEmail({},{message:"Wrong e-mail"})
    readonly email: string;
    @IsString({message:"Must be string"})
    @Length(4, 16, {message:'From 4 to 16 symbols'})
    readonly password: string;
}