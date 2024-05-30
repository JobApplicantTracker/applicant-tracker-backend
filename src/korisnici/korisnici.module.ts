
import { Module, forwardRef } from '@nestjs/common';
import { KorisniciController } from './korisnici.controller';
import { KorisniciService } from './korisnici.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Korisnici } from 'src/entity/entities/Korisnici.entity';
import { Kandidati } from 'src/entity/entities/Kandidati.entity';
import { TipKorisnika } from 'src/entity/entities/TipKorisnika.entity';
import { KandidatiService } from 'src/kandidati/kandidati.service';
import { KandidatiModule } from 'src/kandidati/kandidati.module';
import { Diplome } from 'src/entity/entities/Diplome.entity';
import { TipPosla } from 'src/entity/entities/TipPosla.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Kandidati, Diplome, Korisnici, TipPosla, TipKorisnika])],
    controllers: [KorisniciController],
    providers: [KorisniciService],
})
export class KorisniciModule {

}
