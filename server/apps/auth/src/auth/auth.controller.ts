import { Controller, Post, Body, UseGuards, Get, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, JwtAuthGuard, TokenResponseDto } from "inq-shared-lib";

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: 'Login in the system' })
    @ApiResponse({ status: 200, type: TokenResponseDto })
    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    @ApiOperation({ summary: 'Registration in the system' })
    @ApiResponse({ status: 200, type: TokenResponseDto })
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }

    @ApiOperation({ summary: 'Validating token' })
    @ApiResponse({ status: 200, type: TokenResponseDto })
    @UseGuards(JwtAuthGuard)
    @Get('/check')
    check(@Req() req: TokenResponseDto) {
        return this.authService.checkToken(req);
    }
}
