import { Controller,Body, Post,Get } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import {CreateUserDto} from "./dto/create-user.dto";
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {

    constructor (private usersService: UsersService){}

    @Post()
    create(@Body() userDto:CreateUserDto){
        return this.usersService.createUser(userDto);
    }

    @Get('/:value')
    getByValue(@Param('value') value:string){
        return this.usersService.getUserByEmail(value);
    }
}
