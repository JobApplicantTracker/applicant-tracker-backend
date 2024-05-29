import {
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { TipPosla } from "./TipPosla.entity";
import { Korisnici } from "./Korisnici.entity";
import { Diplome } from "./Diplome.entity";

@Index("FK_KANDIDAT_DIPLOMA_K_DIPLOME", ["idDiplome"], {})
@Index("FK_KANDIDAT_PROFIL_KO_KORISNIC", ["idKorisnika"], {})
@Entity("kandidati", { schema: "bazakandidata" })
export class Kandidati {
    @PrimaryGeneratedColumn({ type: "int", name: "ID_KANDIDATA" })
    idKandidata: number;

    @Column("int", { name: "ID_DIPLOME", nullable: true })
    idDiplome: number | null;

    @Column("int", { name: "ID_KORISNIKA" })
    idKorisnika: number;

    @Column("text", { name: "IME_KANDIDATA" })
    imeKandidata: string;

    @Column("text", { name: "PREZIME_KANDIDATA" })
    prezimeKandidata: string;

    @Column("text", { name: "JMBG" })
    jmbg: string;

    @Column("text", { name: "EMAIL" })
    email: string;

    @Column("text", { name: "TELEFON" })
    telefon: string;

    @Column("text", { name: "GRAD" })
    grad: string;

    @Column("text", { name: "ZELJENA_PLATA" })
    zeljenaPlata: string;

    @Column("text", { name: "OBRAZOVNA_USTANOVA" })
    obrazovnaUstanova: string;

    @ManyToMany(() => TipPosla, (tipPosla) => tipPosla.kandidatis)
    @JoinTable({
        name: "kandidat_posao",
        joinColumns: [
            { name: "ID_KANDIDATA", referencedColumnName: "idKandidata" },
        ],
        inverseJoinColumns: [{ name: "ID_POSLA", referencedColumnName: "idPosla" }],
        schema: "bazakandidata",
    })
    tipPoslas: TipPosla[];

    @ManyToOne(() => Diplome, (diplome) => diplome.kandidatis, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{ name: "ID_DIPLOME", referencedColumnName: "idDiplome" }])
    idDiplome2: Diplome;

    @OneToOne(() => Korisnici)
    @JoinColumn([{ name: "ID_KORISNIKA", referencedColumnName: "idKorisnika" }])
    idKorisnika2: Korisnici;
}