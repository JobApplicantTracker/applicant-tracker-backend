import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Korisnici } from 'src/entity/entities/Korisnici.entity';
import { KorisniciService } from 'src/korisnici/korisnici.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TipKorisnika } from 'src/entity/entities/TipKorisnika.entity';
import { TipPosla } from 'src/entity/entities/TipPosla.entity';
import { Diplome } from 'src/entity/entities/Diplome.entity';
import { Kandidati } from 'src/entity/entities/Kandidati.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Kandidati, Diplome, Korisnici, TipPosla, TipKorisnika])],
    providers: [AuthService, KorisniciService, JwtService],
    controllers: [AuthController]
})
export class AuthModule { }