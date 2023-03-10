import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { Req } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { TokenResponseDto } from './dto/token.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

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
