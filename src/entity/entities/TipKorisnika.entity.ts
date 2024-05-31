import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Korisnici } from "./Korisnici.entity";

@Entity("tip_korisnika", { schema: "bazakandidata" })
export class TipKorisnika {
    @PrimaryGeneratedColumn({ type: "int", name: "ID_TIPA" })
    idTipa: number;

    @Column("text", { name: "NAZIV_TIPA" })
    nazivTipa: string;

    @OneToMany(() => Korisnici, (korisnici) => korisnici.idTipa)
    korisnici: Korisnici[];
}
//19:32:05	alter table KANDIDATI     drop foreign key FK_KANDIDAT_DIPLOMA_K_DIPLOME	Error Code: 1091. Can't DROP 'FK_KANDIDAT_DIPLOMA_K_DIPLOME'; check that column/key exists	0.000 sec
