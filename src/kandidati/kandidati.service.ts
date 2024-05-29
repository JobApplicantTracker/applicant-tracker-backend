import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Kandidati } from 'src/entity/entities/Kandidati.entity';
import { CreateKandidatParams, UpdateKandidatParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class KandidatiService {
    constructor(@InjectRepository(Kandidati) private kandidatiRepository: Repository<Kandidati>) { }

    findKandidat() {
        return this.kandidatiRepository.find();
    }

    createKandidat(kandidatDetails: CreateKandidatParams) {
        const newKandidat = this.kandidatiRepository.create({ ...kandidatDetails });
        return this.kandidatiRepository.save(newKandidat)
    }


    updateKandidat(updateKandidatDetails: UpdateKandidatParams, idKandidata: number) {
        return this.kandidatiRepository.update({ idKandidata }, { ...updateKandidatDetails });
    }
    deleteKandidat(idKandidata: number) {
        return this.kandidatiRepository.delete({ idKandidata });
    }
}