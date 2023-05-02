
import { UseGuards, UseFilters } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { WsJwtAuthGuard, WsExceptionFilter, WsAuthMiddleware, WsValidationPipe, CreateCrashDTO, UpdateCrashDTO } from 'inq-shared-lib';
import { Server, Socket } from 'socket.io';
import { CrashInfo, CrashesService } from './crashes.service';

@WebSocketGateway({ cors: "*" })
@UseGuards(WsJwtAuthGuard)
export class RepairsHistoryGateway {
    @WebSocketServer()
    server: Server;
    constructor(
        private jwtService: JwtService,
        private crashesService: CrashesService) {
    }
    @UseFilters(new WsExceptionFilter())
    afterInit(socket: Socket) {
        socket.use((event: any, next: (err?: any) => void) => {
            const client = event as Socket;
            WsAuthMiddleware(this.jwtService)(client, next);
        });
    }

    @UseFilters(new WsExceptionFilter())
    @SubscribeMessage('user_add_crash')
    async listenForAddCrash(@MessageBody(new WsValidationPipe()) data: CreateCrashDTO, @ConnectedSocket() client: Socket) {
        const crash = await this.crashesService.createCrash(data);

        const crashInfo = await this.crashesService.getUserCrash(data.userCarId);
        client.broadcast.emit('user_added_crash', crashInfo);

        return crash.createdAt;
    }

    // @SubscribeMessage('get_all_crashes')
    // async listenForGetAllCrashes(@MessageBody(new WsValidationPipe()) room: string) {
    //     const crashes: CrashInfo[] = await this.crashesService.getAllCrashesWithCars();
    //     this.server.sockets.to(room).emit('got_all_crashes', crashes);
    // }

    // @SubscribeMessage('create_user_crash')
    // async listenForCreateUserCrash(@MessageBody(new WsValidationPipe()) data: CreateCrashDTO) {
    //     await this.crashesService.createCrash(data);

    //     const crashes: CrashInfo[] = await this.crashesService.getAllCrashesWithCars();
    //     this.server.sockets.to('supports').emit('got_all_crashes', crashes);
    // }

    // @SubscribeMessage('update_user_crash')
    // async listenForUpdateUserCrash(@MessageBody(new WsValidationPipe()) data: UpdateCrashDTO) {
    //     await this.crashesService.updateCrash(data.id, data);
    // }

    @SubscribeMessage('user_delete_crash')
    async listenForDeleteUserCrash(@MessageBody(new WsValidationPipe()) userCarId: number, @ConnectedSocket() client: Socket) {
        await this.crashesService.removeCrash(userCarId);
        // TODO: Promise.all на создание repairHistory. Изначально isDone=false.
        client.broadcast.emit('user_deleted_crash', userCarId);
    }

    @UseFilters(new WsExceptionFilter())
    @SubscribeMessage('join_room')
    listenJoinRoom(client: Socket, room: string) {
        client.join(room);
    }
}
