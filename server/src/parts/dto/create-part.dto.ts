import { IsNumberString, IsString } from "class-validator";

export class CreatePartDTO{
    @IsString({ message:"$property must be string!"} )
    brand: string;
    @IsString({ message:"$property must be string!"} )
    name: string;
    @IsString({ message:"$property must be string!"} )
    type:string;
    @IsNumberString({},{ message:"$property must be numeric string!"} )
    carId:number;
}