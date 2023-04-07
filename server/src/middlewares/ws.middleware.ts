import { Socket } from 'socket.io';
import { WsJwtAuthGuard } from 'src/auth/ws-jwt-auth.guard';
import { WsException } from "@nestjs/websockets";
export type SocketIOMiddleWare = {
    (client: Socket, next: (err?: Error) => void);
}


// eslint-disable-next-line func-style
export const WsAuthMiddleware = (jwtService): SocketIOMiddleWare => (client, next) => {
    try {
        WsJwtAuthGuard.validateToken(client, jwtService);
        next();
    } catch (error) {
        next(error);
    }
};

// import { WsException } from "@nestjs/websockets";
// import { Injectable, NestMiddleware, UseFilters } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Socket } from 'socket.io';

// @Injectable()
// export class WsAuthMiddleware implements NestMiddleware {
//   constructor(private readonly jwtService: JwtService) {}

//   async use(socket: Socket, next: () => void) {
//     try {
//       const authHeader = socket.handshake.headers.authorization;
//       if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         throw new Error('Invalid authorization header');
//       }
//       const token = authHeader.split(' ')[1];
//       const decoded = await this.jwtService.verifyAsync(token);
//       socket.data.user = decoded; // Attach decoded user to socket data
//       next();
//     } catch (err) {
//         next(err)
//       throw new WsException('Invalid token');
//     }
//   }
// }
