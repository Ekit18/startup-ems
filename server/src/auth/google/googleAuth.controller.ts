import { Controller, Get } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GoogleCodeDto } from '../dto/googleCode.dto';
import { TokenResponseDto } from '../dto/token.dto';

import { GoogleAuthService } from './googleAuth.service';

@ApiTags("Google auth")
@Controller('auth/google')
export class GoogleAuthController {
    constructor(
        private readonly googleAuthService: GoogleAuthService
        ) {}

    @ApiOperation({ summary: "Redirecting for Google auth" })
    @ApiResponse({ status: 200, type: TokenResponseDto })
    @Get("/redirect")
    googleRedirect(@Query() googleCodeDto: GoogleCodeDto) {
        return this.googleAuthService.authenticate(googleCodeDto);
    }
}
