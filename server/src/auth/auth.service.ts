import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { TokenResponseDto } from './dto/token.dto';
@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
        private jwtService: JwtService) { }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
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

    async googleRegistration(email:string) {
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
    private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) {
        throw new UnauthorizedException({ message: "User doesn't exist" });
    }
    if (user.isRegisteredWithGoogle) {
       return user;
    }
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEquals) {
        return user;
    }
    throw new UnauthorizedException({ message: 'Wrong password or email' });
}

checkToken(req: TokenResponseDto) {
    const token = this.generateToken(req.user);
    return token;
}
}
