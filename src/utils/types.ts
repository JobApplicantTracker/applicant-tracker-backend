export type CreateKandidatParams = {
    imeKandidata: string;
    prezimeKandidata: string;
    jmbg: string;
    email: string;
    telefon: string;
    grad: string;
    zeljenaPlata: string;
    obrazovnaUstanova: string;
}

export type UpdateKandidatParams = {
    imeKandidata: string;
    prezimeKandidata: string;
    jmbg: string;
    email: string;
    telefon: string;
    grad: string;
    zeljenaPlata: string;
    obrazovnaUstanova: string;
}

export type CreateKorisnikParams = {
    idTipa: number;
    idKandidata: number;
    username: string;
    password: string;
}