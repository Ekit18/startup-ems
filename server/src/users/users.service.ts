import { Injectable, HttpStatus } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/addRole.dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService) { }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("USER")
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });
        return user;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.id)
            return dto;
        }
        throw new HttpException('User or role does not exist', HttpStatus.NOT_FOUND)
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({ include: { all: true } });
        return users;
    }

    async updateUser(id: number, dto: UpdateUserDto) {
        if (!Object.keys(dto).length) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return User.update({ ...dto }, { where: { id: id } });
    }

    async remove(id: number) {
        return User.destroy({ where: { id } });
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        return user;
    }
}
