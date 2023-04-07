import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Socket } from 'socket.io';
import { WsException } from "@nestjs/websockets";


@Injectable()
export class WsJwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }


    // canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    //     const req: Socket = context.switchToWs().getClient();
    //     try {
    //         const authHeader = req.handshake.headers.authorization;
    //         if (!authHeader) {
    //             throw new WsException('Invalid credentials.');
    //         }
    //         const bearer = authHeader.split(' ')[0];
    //         const token = authHeader.split(' ')[1];
    //         if (bearer !== 'Bearer' || !token) {
    //             console.log("test");
    //             req.disconnect(true);
    //             throw new WsException('Invalid credentials.');
    //         }
    //         console.log(bearer, token === null, typeof token, token, authHeader.split(' '));
    //         const user = this.jwtService.verify(token);
    //         return true;
    //     } catch (e) {
    //         console.log(e);
    //         throw new WsException('Invalid credentials.');
    //     }
    // }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req: Socket = context.switchToWs().getClient();
        try {
            const authHeader = req.handshake.headers.authorization;
            if (!authHeader) {
                throw new WsException('Invalid credentials.');
            }
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            if (bearer !== 'Bearer' || !token) {
                req.disconnect(true);
                throw new WsException('Invalid credentials.');
            }
            console.log(bearer, token === null, typeof token, token, authHeader.split(' '));
            const user = this.jwtService.verify(token);
            return true;
        } catch (e) {
            console.log(e);
            throw new WsException('Invalid credentials.');
        }
    }

    static validateToken(req: Socket, jwtService: JwtService) {
        const authHeader = req.handshake.headers.authorization;
        if (!authHeader) {
            throw new WsException('Invalid credentials.');
        }


        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];
        if (bearer !== 'Bearer' || !token) {
            console.log("validation error");
            req.disconnect(true);
            throw new WsException('Invalid credentials.');
        }
        const user = jwtService.verify(token);
        return user;
    }
}
