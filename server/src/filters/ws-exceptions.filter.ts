import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
@Catch(WsException)
export class WsExceptionFilter implements ExceptionFilter {
    catch(exception: WsException, host: ArgumentsHost) {
        console.log("tetetet");
        const ctx = host.switchToWs();
        const client: Socket = ctx.getClient();
        const errorMessage = exception.getError();

        client.emit('exception', {
            message: errorMessage,
            status: errorMessage,
        });
        client.disconnect(true);
    }
}
