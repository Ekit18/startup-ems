import { Controller, Body, Post, Get, UseGuards, Put ,Delete} from '@nestjs/common';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/addRole.dto';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from './dto/update-user.dto';
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
    @Post('/role')
    addRole(@Body() dto:AddRoleDto) {
        return this.usersService.addRole(dto);
    }
    @Get()
    getAllUsers(){
        return this.usersService.getAllUsers();
    }
    @Put(':id')
    update(@Param('id') id:number, @Body() userDto:UpdateUserDto){
        return this.usersService.updateUser(id, userDto);
    }
    @Delete(':id')
    remove(@Param('id')id:number){
        return this.usersService.remove(id);
    }
}
