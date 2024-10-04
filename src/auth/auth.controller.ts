import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LoginDto } from 'src/auth/dtos/auth.dto';
import { AuthService } from 'src/auth/auth.service';
import { RefreshJwtGuard } from './guard/refresh.guard';
import { UsersService } from 'src/services/users.service';
import { UsersDTO } from 'src/types/User.type';


@Controller('auth')
export class AuthController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) { }

    @Post('register')
    async registerUser(@Body() dto: UsersDTO) {
        const data: UsersDTO = { ...dto, idRole: 3 }
        return await this.usersService.createUser(data);
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        return await this.authService.login(dto);
    }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async refreshToken(@Request() req) {
        console.log('refreshed');

        return await this.authService.refreshToken(req.user);
    }
}