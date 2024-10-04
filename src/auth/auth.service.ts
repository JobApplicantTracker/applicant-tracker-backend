import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/auth/dtos/auth.dto';
import { UsersService } from 'src/services/users.service';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/entity/entities/Users.entity';
import { LoginResponseDTO } from 'src/types/LoginResponse.dto';

const EXPIRE_TIME = 60 * 60 * 1000;
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async login(dto: LoginDto): Promise<LoginResponseDTO> {
        const user = await this.validateUser(dto);
        const payload = {
            email: user.email,
            sub: {
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role.name
            },
        };
        return {
            user,
            backendTokens: {
                accessToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '1d',
                    secret: process.env.jwtSecretKey,
                }),
                refreshToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '7d',
                    secret: process.env.jwtRefreshTokenKey,
                }),
                expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
            },
        };
    }

    async validateUser(dto: LoginDto): Promise<Users> {
        const user = await this.usersService.findByEmail(dto.email)
        if (user && await bcrypt.compare(dto.password, user.password))
            return user;
        throw new UnauthorizedException();
    }

    async refreshToken(user: any) {
        const payload = {
            username: user.username,
            sub: user.sub
        };

        return {
            accessToken: await this.jwtService.signAsync(payload, {
                expiresIn: '1d',
                secret: process.env.jwtSecretKey,
            }),
            refreshToken: await this.jwtService.signAsync(payload, {
                expiresIn: '7d',
                secret: process.env.jwtRefreshTokenKey,
            }),
            expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
        };
    }
}