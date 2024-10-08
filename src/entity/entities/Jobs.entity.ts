import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users.entity";

@Entity("jobs", { schema: "applicant-tracker-database" })
export class Jobs {

    @PrimaryGeneratedColumn({ type: "int", name: "ID_JOB" })
    idJob: number;

    @Column("varchar", { name: "NAME", length: 45 })
    name: string;

    @Column("varchar", { name: "CITY", length: 45 })
    City: string;

    @Column("int", { name: "NUM_OF_SEATS" })
    numOfSeats: number;

    @Column("text", { name: "DESCRIPTION" })
    description: string;

    @Column("bool", { name: "DELETED" })
    deleted: boolean

    @ManyToOne(() => Users, (user) => user.createdJobs)
    creator: Users;

    @ManyToMany(() => Users, (candidates) => candidates.idUser)
    @JoinTable({
        name: "job_candidates", // Join table name
        joinColumn: {
            name: "jobId",
            referencedColumnName: "idJob"
        },
        inverseJoinColumn: {
            name: "userId",
            referencedColumnName: "idUser"
        }
    })
    candidates: Users[];
}

// @ManyToOne(() => TipKorisnika, (tipKorisnika) => tipKorisnika.korisnici, {
//     onDelete: "RESTRICT",
//     onUpdate: "RESTRICT",
// })
// @JoinColumn([{ name: "ID_TIPA", referencedColumnName: "idTipa" }])
// idTipa: TipKorisnika;