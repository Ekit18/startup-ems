import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { PipeTransform, ArgumentMetadata } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidatorException } from "src/exception/validation.exception";
import { WsValidatorException } from "src/exception/ws-validation.exception";

@Injectable()
export class WsValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToClass(metadata.metatype, value);
        console.log("\n\n\n")
        console.log(obj)
        console.log("\n\n\n")
        const errors = await validate(obj);
        if (errors.length) {
            const messages = errors.map((error) => ({
                    [error.property]: Object.values(error.constraints).join(', ')
                }));
            throw new WsValidatorException(messages);
        }
        return value;
    }
}
