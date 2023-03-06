import {
    Controller,
    Post,
    Body,
    Req,
    Get,
} from '@nestjs/common';
import { Query, Redirect, Res } from '@nestjs/common/decorators';
import { GoogleCodeDto } from '../dto/googleCode.dto';

import { GoogleAuthService } from './googleAuth.service';

@Controller('auth/google')
export class GoogleAuthController {
    constructor(
        private readonly googleAuthService: GoogleAuthService
    ) { }


    @Get("/redirect")
    googleRedirect(@Query() googleCodeDto: GoogleCodeDto) {
        console.log(googleCodeDto.code);
        return this.googleAuthService.authenticate(googleCodeDto);
    }
}
