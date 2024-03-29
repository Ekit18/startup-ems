import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User, CreateUserDto, AddRoleDto, UpdateUserDto } from "inq-shared-lib";
import { RolesService } from "../roles/roles.service";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService) { }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("USER");
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });
        return user;
    }
    async addRole(dto:AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }
        throw new HttpException('User or role does not exist', HttpStatus.NOT_FOUND);
    }
    async getAllUsers() {
        const users = await this.userRepository.findAll({ include: { all: true } });
        return users;
    }
    updateUser(id: number, dto:UpdateUserDto) {
        if (!Object.keys(dto).length) {
            throw new HttpException({ message: 'Wrong data' }, HttpStatus.BAD_REQUEST);
        }
        return User.update({ ...dto }, { where: { id } });
    }
    remove(id:number) {
        return User.destroy({ where: { id } });
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        return user;
    }
}
