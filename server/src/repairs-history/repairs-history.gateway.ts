import { UseGuards, UseFilters } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
    OnGatewayConnection,
    ConnectedSocket
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsJwtAuthGuard } from 'src/auth/ws-jwt-auth.guard';
import { WsExceptionFilter } from 'src/filters/ws-exceptions.filter';
import { WsAuthMiddleware } from 'src/middlewares/ws.middleware';
import { CreateRepairsHistory } from './dto/create-repairs-history.dto';
import { TestDto } from './dto/test.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { WsValidationPipe } from 'src/pipes/ws-validation.pipe';
import { RepairsHistoryService } from './repairs-history.service';


@WebSocketGateway({ cors: "*" })
@UseGuards(WsJwtAuthGuard)
export class RepairsHistoryGateway {
    @WebSocketServer()
    server: Server;
    constructor(private jwtService: JwtService, private repairsHistoryService: RepairsHistoryService) {
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
    listenForMessages(@MessageBody() data: any) {
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
    listenForFormSubmit(@MessageBody(new WsValidationPipe()) data: TestDto) {
        console.log(data);
        this.server.sockets.to(data.room).emit('form_update', data);
    }

    @UseFilters(new WsExceptionFilter())
    @SubscribeMessage('join_room')
    listenJoinRoom(client: any, room: string) {
        console.log(room);
        client.join(room);
    }
}
