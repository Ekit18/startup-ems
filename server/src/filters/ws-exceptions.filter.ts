import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { WsValidatorException } from 'src/exception/ws-validation.exception';
@Catch(WsException, WsValidatorException)
export class WsExceptionFilter implements ExceptionFilter {
    catch(exception: WsException, host: ArgumentsHost) {
        const ctx = host.switchToWs();
        const client: Socket = ctx.getClient();
        const errorMessage = exception.getError();
        client.emit('exception', {
            message: errorMessage,
            status: "error",
        });
        client.disconnect(true);
    }
}
