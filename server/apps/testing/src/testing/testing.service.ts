import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AUTH_QUEUE } from "inq-shared-lib";
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TestingService {
    constructor(@Inject(AUTH_QUEUE) private AuthClient: ClientProxy) { }
    async getHello() {
        const tests = await lastValueFrom(this.AuthClient.send({ cmd: "test" }, { data: 2 }));
        return tests;
    }
}
