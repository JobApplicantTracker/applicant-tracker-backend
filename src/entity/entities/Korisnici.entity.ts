import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Kandidati } from "./Kandidati.entity";
import { TipKorisnika } from "./TipKorisnika.entity";

@Index("FK_KORISNIC_PROFIL_KO_KANDIDAT", ["idKandidata"], {})
@Index("FK_KORISNIC_TIP_KORIS_TIP_KORI", ["idTipa"], {})
@Entity("korisnici", { schema: "bazakandidata" })
export class Korisnici {
    @PrimaryGeneratedColumn({ type: "int", name: "ID_KORISNIKA" })
    idKorisnika: number;

    // @Column("int", { name: "ID_TIPA" })
    // idTipa: number | null;

    // @Column("int", { name: "ID_KANDIDATA", nullable: true })
    // idKandidata: number | null;

    @Column("varchar", { name: "USERNAME", length: 45 })
    username: string;

    @Column("varchar", { name: "PASSWORD", length: 45 })
    password: string;

    @OneToOne(() => Kandidati, kandidat => kandidat.idKorisnika, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "ID_KANDIDATA", referencedColumnName: "idKandidata" }])
    idKandidata: Kandidati;

    @ManyToOne(() => TipKorisnika, (tipKorisnika) => tipKorisnika.korisnici, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{ name: "ID_TIPA", referencedColumnName: "idTipa" }])
    idTipa: TipKorisnika;
}
