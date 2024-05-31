import { Injectable, UnauthorizedException } from '@nestjs/common';
import { KorisniciService } from 'src/korisnici/korisnici.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/auth/dtos/auth.dto';
const EXPIRE_TIME = 20 * 10000;
@Injectable()
export class AuthService {
    constructor(private korisniciServis: KorisniciService,
        private jwtService: JwtService
    ) { }

    async login(dto: LoginDto) {
        const user = await this.validateUser(dto);
        const payload = {
            username: user.username,
            sub: {
                idKandidata: user.idKandidata ? user.idKandidata.idKandidata : null,
                idKorisnika: user.idKorisnika,
                idTipa: user.idTipa.idTipa,
                username: user.username
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

    async validateUser(dto: LoginDto) {
        const user = await this.korisniciServis.findByUsername(dto.username)
        if (user && (dto.password === user.password))
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