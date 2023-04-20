import { Controller, UseGuards, UsePipes, Post, Body, Get, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Role, Roles, RolesGuard, ValidationPipe, CreateRoleDto } from "inq-shared-lib";
import { RolesService } from "./roles.service";

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) { }

    @ApiOperation({ summary: 'Creating new role' })
    @ApiResponse({ status: 200, type: Role })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @ApiOperation({ summary: 'Getting role by value' })
    @ApiResponse({ status: 200, type: Role })
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value);
    }
}
