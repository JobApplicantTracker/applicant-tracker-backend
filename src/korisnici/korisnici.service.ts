import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Korisnici } from 'src/entity/entities/Korisnici.entity';
import { CreateKorisnikParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class KorisniciService {
    constructor(
        @InjectRepository(Korisnici) private korisniciRepository: Repository<Korisnici>) { }

    findKorisnici() {
        return this.korisniciRepository.find();
    }

    createKorisnici(korisnikDetails: CreateKorisnikParams) {
        const user = this.findByUsername(korisnikDetails.username);

        if (user) throw new ConflictException('Username duplicated.');

        const newKorisnik = this.korisniciRepository.create({ ...korisnikDetails })
        return this.korisniciRepository.save(newKorisnik);
    }
    findByUsername(username: string) {
        return this.korisniciRepository.findOne({
            where: {
                username: username
            }
        })
    }
    findById(id: number) {
        return this.korisniciRepository.findOne({
            where: {
                idKorisnika: id
            }
        })
    }
}