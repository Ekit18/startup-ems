import { Injectable } from "@nestjs/common";


@Injectable()
export class TestingService {
    getHello(): string {
        return 'Hello World!';
    }
}
