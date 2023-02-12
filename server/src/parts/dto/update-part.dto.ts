import { IsNumberString, IsOptional, IsString } from "class-validator";

export class UpdatePartDTO{
    @IsOptional()
    @IsString({ message:"$property must be string!"} )
    brand: string;
    @IsOptional()
    @IsString({ message:"$property must be string!"} )
    name: string;
    @IsOptional()
    @IsString({ message:"$property must be string!"} )
    type:string;
}