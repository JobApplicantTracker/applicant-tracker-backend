import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/services/users.service';
import { Users } from 'src/entity/entities/Users.entity';
import { Roles } from 'src/entity/entities/Roles.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Users, Roles])],
    providers: [AuthService, UsersService, JwtService],
    controllers: [AuthController]
})
export class AuthModule { }