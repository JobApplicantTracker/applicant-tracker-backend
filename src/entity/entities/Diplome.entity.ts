import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Kandidati } from "./Kandidati.entity";

@Entity("diplome", { schema: "bazakandidata" })
export class Diplome {
    @PrimaryGeneratedColumn({ type: "int", name: "ID_DIPLOME" })
    idDiplome: number;

    @Column("text", { name: "NAZIV_DIPLOME" })
    nazivDiplome: string;

    @OneToMany(() => Kandidati, (kandidati) => kandidati.idDiplome2)
    kandidatis: Kandidati[];
}