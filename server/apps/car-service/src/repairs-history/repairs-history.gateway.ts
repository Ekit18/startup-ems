
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
import { WsJwtAuthGuard, WsExceptionFilter, WsAuthMiddleware } from 'inq-shared-lib';
import { Server, Socket } from 'socket.io';
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
    @SubscribeMessage('form_submit')
    listenForFormSubmit(@MessageBody() data: any) {
        console.log(data);
        // .to(data.room)
        this.server.sockets.to(data.repairHistoryId).emit("signing_update", data);
    }

    @UseFilters(new WsExceptionFilter())
    @SubscribeMessage('join_room')
    listenJoinRoom(client: any, repairHistoryId: number) {
        console.log(`JOINED${repairHistoryId}`);
        client.join(repairHistoryId);
    }

    @UseFilters(new WsExceptionFilter())
    @SubscribeMessage('draw')
    listenForOnDraw(@MessageBody() data: any) {
        console.log(data);
        // .to(data.room)
        this.server.sockets.to(data.repairHistoryId).emit("ondraw", { x: data.x, y: data.y });
    }
    @UseFilters(new WsExceptionFilter())
    @SubscribeMessage('down')
    listenForOnDown(@MessageBody() data: any) {
        console.log(data);
        // .to(data.room)
        this.server.sockets.to(data.repairHistoryId).emit("ondown", { x: data.x, y: data.y });
    }


    @UseFilters(new WsExceptionFilter())
    @SubscribeMessage('finish')
    listenForFinish(@MessageBody() data: any) {
        console.log(data);
        // .to(data.room)
        this.server.sockets.to(data.repairHistoryId).emit("finish");
    }
}
