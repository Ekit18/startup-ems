import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { TokenResponseDto, GoogleCodeDto } from "inq-shared-lib";
import { GoogleAuthService } from "./googleAuth.service";

@ApiTags("Google auth")
@Controller('auth/google')
export class GoogleAuthController {
    constructor(
        private readonly googleAuthService: GoogleAuthService
    ) { }

    @ApiOperation({ summary: "Redirecting for Google auth" })
    @ApiResponse({ status: 200, type: TokenResponseDto })
    @Get("/redirect")
    googleRedirect(@Query() googleCodeDto: GoogleCodeDto) {
        return this.googleAuthService.authenticate(googleCodeDto);
    }
}
