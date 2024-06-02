import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Korisnici } from 'src/entity/entities/Korisnici.entity';
import { BasicKorisnikParams } from 'src/utils/types';
import { FindOneOptions, Repository } from 'typeorm';
import { TipKorisnika } from 'src/entity/entities/TipKorisnika.entity';
import { KandidatiService } from 'src/kandidati/kandidati.service';
import { Kandidati } from 'src/entity/entities/Kandidati.entity';

@Injectable()
export class KorisniciService {
    constructor(
        @InjectRepository(Korisnici) private korisniciRepository: Repository<Korisnici>,
        @InjectRepository(TipKorisnika) private readonly tipoviRepository: Repository<TipKorisnika>,
        @InjectRepository(Kandidati)
        private kandidatiRepository: Repository<Kandidati>) { }

    async findAll()//: Promise<Korisnici[]> 
    {
        return await this.korisniciRepository.find({
            relations: ["idKandidata", "idTipa"]
        });
    }
    async findOne(idKorisnika: number): Promise<Korisnici | null> {
        const korisnik = await this.korisniciRepository.findOne({
            where: { idKorisnika },
            relations: ["idKandidata", "idTipa"]
        });
        if (!korisnik) {
            return null; // Return null if no Korisnici entity is found
        }

        // If idKandidata is null, set it to null explicitly
        if (!korisnik.idKandidata) {
            korisnik.idKandidata = null;
        }
        return korisnik;
    }

    async findByUsername(username: string): Promise<Korisnici | null> {
        return await this.korisniciRepository.findOne({
            where: {
                username: username
            },
            relations: ["idKandidata", "idTipa"]
        })
    }
    async findById(id: number): Promise<Korisnici | null> {
        return await this.korisniciRepository.findOne({
            where: {
                idKorisnika: id
            },
            relations: ["idKandidata", "idTipa"]
        })
    }

    async createKorisnici(korisnikDetails: BasicKorisnikParams) {
        const user = await this.findByUsername(korisnikDetails.username)
        console.log(user)
        if (user) throw new ConflictException('Username duplicated.');

        const { idKandidata = null, idTipa, ...korisnikData } = korisnikDetails;

        const tip = await this.tipoviRepository.findOne({
            where: { idTipa }
        });
        if (!tip) {
            throw new Error('Tip with id ${idTipa} not found');
        }
        let kandidat = null;
        if (idKandidata != null) {
            kandidat = await this.kandidatiRepository.findOne({
                where: { idKandidata }
            });
            if (!kandidat) {
                throw new Error('Kandidat with id ${idTipa} not found');
            }
        }

        const newKorisnik = this.korisniciRepository.create({
            ...korisnikData,
            idTipa: tip,
            idKandidata: kandidat
        })

        return await this.korisniciRepository.save(newKorisnik);
    }

    async deleteKorisnik(idKorisnika: number): Promise<void> {
        const user = await this.findOne(idKorisnika);
        let kandidat;
        if (user) {
            if (user.idKandidata) {
                kandidat = await this.kandidatiRepository.findOne({ where: { idKandidata: user.idKandidata.idKandidata } });
                kandidat.idKorisnika = null;
                user.idKandidata = null;
                await this.korisniciRepository.save(user);
                await this.kandidatiRepository.save(kandidat);
                await this.kandidatiRepository.delete(kandidat.idKandidata);
            }
            await this.korisniciRepository.delete(idKorisnika);
        }
    }

    async getTipoviKorisnika() {
        return await this.tipoviRepository.find();
    }
}