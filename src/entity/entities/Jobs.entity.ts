import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users.entity";

@Entity("jobs", { schema: "applicant-tracker-database" })
export class Jobs {

    @PrimaryGeneratedColumn({ type: "int", name: "ID_JOB" })
    idJob: number;

    @Column("varchar", { name: "NAME", length: 45 })
    name: string;

    @Column("int", { name: "NUM_OF_SEATS" })
    numOfSeats: number;

    @Column("text", { name: "DESCRIPTION" })
    description: string;

    @Column("bool", { name: "DELETED" })
    deleted: boolean

    @ManyToOne(() => Users, (creator) => creator.idUser)
    creator: Users;

    @ManyToMany(() => Users, (candidates) => candidates.idUser)
    @JoinTable()
    candidates: Users[];
}

// @ManyToOne(() => TipKorisnika, (tipKorisnika) => tipKorisnika.korisnici, {
//     onDelete: "RESTRICT",
//     onUpdate: "RESTRICT",
// })
// @JoinColumn([{ name: "ID_TIPA", referencedColumnName: "idTipa" }])
// idTipa: TipKorisnika;