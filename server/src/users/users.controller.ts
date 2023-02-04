import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/addRole.dto';
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.usersService.getUserByEmail(value);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }
}
