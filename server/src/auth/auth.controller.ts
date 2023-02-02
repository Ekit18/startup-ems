import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Req } from '@nestjs/common/decorators';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';



@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }


    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/check')
    check(@Req() req: any) {
        return this.authService.checkToken(req);
    }
}
