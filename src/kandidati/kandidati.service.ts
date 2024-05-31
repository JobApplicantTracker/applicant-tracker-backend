import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Diplome } from 'src/entity/entities/Diplome.entity';
import { Kandidati } from 'src/entity/entities/Kandidati.entity';
import { Korisnici } from 'src/entity/entities/Korisnici.entity';
import { TipPosla } from 'src/entity/entities/TipPosla.entity';
import { BasicKandidatParams } from 'src/utils/types';
import { FindOneOptions, In, Repository } from 'typeorm';

@Injectable()
export class KandidatiService {
    constructor(
        @InjectRepository(Kandidati)
        private kandidatiRepository: Repository<Kandidati>,
        @InjectRepository(Diplome)
        private readonly diplomeRepository: Repository<Diplome>,
        @InjectRepository(TipPosla)
        private readonly tipPoslaRepository: Repository<TipPosla>,
        @InjectRepository(Korisnici)
        private korisniciRepository: Repository<Korisnici>) { }

    async findAll(): Promise<Kandidati[]> {
        return await this.kandidatiRepository.find({
            relations: ["idDiplome", "idKorisnika", "tipPosla"]
        });
    }

    async findOne(idKandidata: number): Promise<Kandidati | null> {
        const options: FindOneOptions<Kandidati> = {
            where: { idKandidata: idKandidata },
            relations: ["idDiplome", "idKorisnika", "tipPosla"]
        };
        return await this.kandidatiRepository.findOne(options);
    }
    async createKandidat(kandidatDetails: BasicKandidatParams) {
        const { idDiplome = null, idKorisnika, tipPosla = [], ...kandidatData } = kandidatDetails
        let diploma = null;
        if (idDiplome != null) {
            diploma = await this.diplomeRepository.findOne({
                where: { idDiplome }
            });
            if (!diploma) {
                throw new Error(`Diploma with id ${idDiplome} not found`);
            }
        }
        const korisnik = await this.korisniciRepository.findOne({ where: { idKorisnika } });
        if (!korisnik) {
            throw new Error(`Korisnik with id ${idKorisnika} not found`);
        }
        let poslovi = [];
        if (tipPosla.length) {
            poslovi = await this.tipPoslaRepository.find({
                where: { idPosla: In(tipPosla) }
            });
        }

        const newKandidat = this.kandidatiRepository.create({
            ...kandidatData,
            idDiplome: diploma,
            idKorisnika: korisnik,
            tipPosla: poslovi
        });

        return await this.kandidatiRepository.save(newKandidat);
    }


    async updateKandidat(id: number, params: BasicKandidatParams): Promise<Kandidati> {
        const { idDiplome = null, idKorisnika, tipPosla = [], ...kandidatData } = params;

        const kandidat = await this.kandidatiRepository.findOne({ where: { idKandidata: id } });
        if (!kandidat) {
            throw new Error(`Kandidat with id ${id} not found`);
        }
        let diploma = null
        if (idDiplome != null) {
            diploma = await this.diplomeRepository.findOne({ where: { idDiplome } });
            if (!diploma) {
                throw new Error(`Diploma with id ${idDiplome} not found`);
            }
        }

        const korisnik = await this.korisniciRepository.findOne({ where: { idKorisnika } });
        if (!korisnik) {
            throw new Error(`Korisnik with id ${idKorisnika} not found`);
        }
        console.log(tipPosla)
        let poslovi = [];
        if (tipPosla.length) {
            poslovi = await this.tipPoslaRepository.find({
                where: { idPosla: In(tipPosla) }
            });
        }

        const updatedKandidat = this.kandidatiRepository.merge(kandidat, {
            ...kandidatData,
            idDiplome: diploma,
            idKorisnika: korisnik,
            tipPosla: poslovi
        });
        console.log(updatedKandidat)
        return await this.kandidatiRepository.save(updatedKandidat);
    }
    async deleteKandidat(idKandidata: number): Promise<void> {
        await this.kandidatiRepository.delete(idKandidata);
    }

    async getDiplome() {
        return await this.diplomeRepository.find();
    }

    async getTioviPosla() {
        return await this.tipPoslaRepository.find();
    }
}