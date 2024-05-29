import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Korisnici } from "./Korisnici.entity";

@Entity("tip_korisnika", { schema: "bazakandidata" })
export class TipKorisnika {
    @PrimaryGeneratedColumn({ type: "int", name: "ID_TIPA" })
    idTipa: number;

    @Column("text", { name: "NAZIV_TIPA" })
    nazivTipa: string;

    @OneToMany(() => Korisnici, (korisnici) => korisnici.idTipa2)
    korisnicis: Korisnici[];
}