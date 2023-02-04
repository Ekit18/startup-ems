import { HttpException, HttpStatus } from "@nestjs/common";

export class ValidatorException extends HttpException{
    constructor(response){
        super({ "message":response }, HttpStatus.BAD_REQUEST);
    }
}