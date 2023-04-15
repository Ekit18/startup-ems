import { CrashInfo, CrashesService } from './crashes.service';
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
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { WsValidationPipe } from 'src/pipes/ws-validation.pipe';
import { TestDto } from 'src/repairs-history/dto/test.dto';
import { CreateCrashDTO } from './dto/create-crash.dto';
import { UpdateCrashDTO } from './dto/update-crash.dto';


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
        console.log('New client connected');
        socket.use((event: any, next: (err?: any) => void) => {
            const client = event as Socket;
            WsAuthMiddleware(this.jwtService)(client, next);
        });
    }

    @SubscribeMessage('get_all_crashes')
    async listenForGetAllCrashes(@MessageBody(new WsValidationPipe()) room: string) {
        const crashes: CrashInfo[] = await this.crashesService.getAllCrashesWithCars();
        this.server.sockets.to(room).emit('got_all_crashes', crashes);
    }

    @SubscribeMessage('create_user_crash')
    async listenForCreateUserCrash(@MessageBody(new WsValidationPipe()) data: CreateCrashDTO) {
        await this.crashesService.createCrash(data);

        const crashes: CrashInfo[] = await this.crashesService.getAllCrashesWithCars();
        this.server.sockets.to('supports').emit('got_all_crashes', crashes);
    }

    @SubscribeMessage('user_add_crash')
    async listenForAddCrash(@MessageBody() data: CreateCrashDTO) {
        await this.crashesService.createCrash(data);
        await this.server.sockets.emit('service_display_crash', data);
    }

    // @SubscribeMessage('update_user_crash')
    // async listenForUpdateUserCrash(@MessageBody(new WsValidationPipe()) data: UpdateCrashDTO) {
    //     await this.crashesService.updateCrash(data.id, data);
    // }

    // @SubscribeMessage('remove_user_crash')
    // async listenForDeleteUserCrash(@MessageBody(new WsValidationPipe()) id: number) {
    //     await this.crashesService.removeCrash(id);
    // }

    @UseFilters(new WsExceptionFilter())
    @SubscribeMessage('join_room')
    listenJoinRoom(client: Socket, room: string) {
        console.log(room);
        client.join(room);
    }
}
