import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Crashes } from './crashes.model';
import { CreateCrashDTO } from './dto/create-crash.dto';

@Injectable()
export class CrashesService {
    constructor(@InjectModel(Crashes) private crashRepository: typeof Crashes) { }

    async createCrash(dto: CreateCrashDTO) {
        const crash = await this.crashRepository.create(dto);
        return crash;
    }

    async getCrashByUserId(userId: number) {
    }
}
