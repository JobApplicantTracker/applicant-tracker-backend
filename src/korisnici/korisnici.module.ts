
import { Module } from '@nestjs/common';
import { KorisniciController } from './korisnici.controller';
import { KorisniciService } from './korisnici.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Korisnici } from 'src/entity/entities/Korisnici.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Korisnici])],
    controllers: [KorisniciController],
    providers: [KorisniciService]
})
export class KorisniciModule {

}
