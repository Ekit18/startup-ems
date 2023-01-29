import { Controller,Body, Post } from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {

    constructor (private usersService: UsersService){}

    @Post()
    create(@Body() userDto:CreateUserDto){
        return this.usersService.createUser(userDto);
    }

}
