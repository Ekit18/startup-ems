import { Controller, Post, Body, UseGuards, Get, Put, Param, Delete } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { User, CreateUserDto, AddRoleDto, Roles, RolesGuard, UpdateUserDto } from "inq-shared-lib";
import { UsersService } from "./users.service";

@ApiTags('User')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }
    @ApiOperation({ summary: 'Creating new user' })
    @ApiResponse({ status: 200, type: User })
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({ summary: 'Adding new role to the user' })
    @ApiResponse({ status: 200, type: AddRoleDto })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    @ApiOperation({ summary: 'Getting all users from database' })
    @ApiResponse({ status: 200, type: [User] })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({ summary: 'Updating user information' })
    @ApiResponse({ status: 200 })
    @Put(':id')
    update(@Param('id') id: number, @Body() userDto: UpdateUserDto) {
        return this.usersService.updateUser(id, userDto);
    }

    @ApiOperation({ summary: 'Deleting user' })
    @ApiResponse({ status: 200 })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.usersService.remove(id);
    }
}
