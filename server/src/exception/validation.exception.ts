import { HttpException, HttpStatus } from "@nestjs/common";

export class ValidatorException extends HttpException{
    messages;

    constructor(response){
        super(response, HttpStatus.BAD_REQUEST);
        this.message=response;
    }
}