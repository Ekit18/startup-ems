import { UseGuards, UseFilters } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
    OnGatewayConnection
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsJwtAuthGuard } from 'src/auth/ws-jwt-auth.guard';
import { WsExceptionFilter } from 'src/filters/ws-exceptions.filter';
import { WsAuthMiddleware } from 'src/middlewares/ws.middleware';

@WebSocketGateway({ cors: "*" })
@UseGuards(WsJwtAuthGuard)
export class RepairsHistoryGateway {
    @WebSocketServer()
    server: Server;
    constructor(private jwtService: JwtService) {
    }
    @UseFilters(new WsExceptionFilter())
    afterInit(socket: Socket) {
        console.log('New client connected');
        socket.use((event: any, next: (err?: any) => void) => {
            const client = event as Socket;
            WsAuthMiddleware(this.jwtService)(client, next);
        });
    }

    @UseFilters(new WsExceptionFilter())
    @SubscribeMessage('send_message')
    listenForMessages(@MessageBody() data: string) {
        console.log(data);
        this.server.sockets.emit('send_message', data);
    }


    @UseFilters(new WsExceptionFilter())
    @SubscribeMessage('send_check')
    listenForChecks(@MessageBody() data: boolean) {
        console.log(data);
        this.server.sockets.emit('send_check', data);
    }


    @UseFilters(new WsExceptionFilter())
    @SubscribeMessage('form_submit')
    listenForFormSubmit(@MessageBody() data: any) {
        console.log(data);
        this.server.sockets.emit('form_update', data);
    }
}
