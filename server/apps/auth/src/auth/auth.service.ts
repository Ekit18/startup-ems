import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto, User } from 'inq-shared-lib';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
        private jwtService: JwtService) { }

    async login(userDto: CreateUserDto) {
        const user = await this.validateRegularUser(userDto);
        return this.generateToken(user);
    }

    async googleLogin(userDto: CreateUserDto) {
        const user = await this.validateGoogleUser(userDto);
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException({ message: 'User with this email already exists' }, HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({ ...userDto, password: hashPassword });
        return this.generateToken(user);
    }

    async googleRegistration(email: string) {
        const candidate = await this.userService.getUserByEmail(email);
        if (candidate) {
            throw new HttpException({ message: 'User with this email already exists' }, HttpStatus.BAD_REQUEST);
        }
        const user = await this.userService.createUser({ email, isRegisteredWithGoogle: true });
        return this.generateToken(user);
    }

    private generateToken(user: User) {
        const payload = { email: user.email, id: user.id, roles: user.roles };
        return {
            token: this.jwtService.sign(payload)
        };
    }
    private async validateRegularUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        if (!user) {
            throw new UnauthorizedException({ message: "User doesn't exist" });
        }
        if (user.isRegisteredWithGoogle) {
            throw new UnauthorizedException({ message: 'Wrong password or email' });
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({ message: 'Wrong password or email' });
    }

    private async validateGoogleUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        if (!user) {
            throw new UnauthorizedException({ message: "User doesn't exist" });
        }
        return user;
    }

    checkToken(req: any) {
        const token = this.generateToken(req.user);
        return token;
    }

    test(data:number) {
        return data;
    }
}
