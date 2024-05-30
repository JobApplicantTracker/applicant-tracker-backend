import { Diplome } from "src/entity/entities/Diplome.entity";
import { Kandidati } from "src/entity/entities/Kandidati.entity";
import { Korisnici } from "src/entity/entities/Korisnici.entity";
import { TipKorisnika } from "src/entity/entities/TipKorisnika.entity";
import { TipPosla } from "src/entity/entities/TipPosla.entity";

export type BasicKandidatParams = {
    imeKandidata: string;
    prezimeKandidata: string;
    jmbg: string;
    email: string;
    telefon: string;
    grad: string;
    zeljenaPlata: string;
    obrazovnaUstanova: string;
    idDiplome?: number;
    idKorisnika: number;
    tipPosla: number[]
}

export type SaveKandidatParams = {
    imeKandidata: string;
    prezimeKandidata: string;
    jmbg: string;
    email: string;
    telefon: string;
    grad: string;
    zeljenaPlata: string;
    obrazovnaUstanova: string;
    idKorisnika: Korisnici;
    idDiplome?: Diplome;
    tipPosla: TipPosla[]
}

export type SaveKorisnikParams = {
    idTipa: TipKorisnika;
    idKandidata?: Kandidati;
    username: string;
    password: string;
}

export type BasicKorisnikParams = {
    idTipa: number;
    idKandidata?: number;
    username: string;
    password: string;
}