import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Korisnici } from 'src/entity/entities/Korisnici.entity';
import { KorisniciService } from 'src/korisnici/korisnici.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Korisnici])],
    providers: [AuthService, KorisniciService, JwtService],
    controllers: [AuthController]
})
export class AuthModule { }