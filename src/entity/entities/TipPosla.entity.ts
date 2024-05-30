
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Kandidati } from "./Kandidati.entity";

@Entity("tip_posla", { schema: "bazakandidata" })
export class TipPosla {
    @PrimaryGeneratedColumn({ type: "int", name: "ID_POSLA" })
    idPosla: number;

    @Column("text", { name: "NAZIV_POSLA" })
    nazivPosla: string;

    @ManyToMany(() => Kandidati, (kandidati) => kandidati.tipPosla)
    kandidati: Kandidati[];
}
