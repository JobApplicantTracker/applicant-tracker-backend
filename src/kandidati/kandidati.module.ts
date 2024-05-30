import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kandidati } from 'src/entity/entities/Kandidati.entity';
import { KandidatiController } from './kandidati.controller';
import { KandidatiService } from './kandidati.service';
import { Diplome } from 'src/entity/entities/Diplome.entity';
import { Korisnici } from 'src/entity/entities/Korisnici.entity';
import { TipPosla } from 'src/entity/entities/TipPosla.entity';
import { TipKorisnika } from 'src/entity/entities/TipKorisnika.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Kandidati, Diplome, Korisnici, TipPosla, TipKorisnika])],
    controllers: [KandidatiController],
    providers: [KandidatiService],
})
export class KandidatiModule { }