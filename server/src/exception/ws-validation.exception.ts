import { WsException } from '@nestjs/websockets';
export class WsValidatorException extends WsException {
    constructor(response) {
        super(response);
    }
}
