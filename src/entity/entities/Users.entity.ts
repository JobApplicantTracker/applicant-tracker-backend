import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "./Roles.entity";
import { Jobs } from "./Jobs.entity";

@Entity("users", { schema: "applicant-tracker-database" })
export class Users {
    @PrimaryGeneratedColumn({ type: "int", name: "ID_USER" })
    idUser: number;

    @Column("varchar", { name: "FIRST_NAME", length: 45, default: "" })
    firstName: string;

    @Column("varchar", { name: "LAST_NAME", length: 45, default: "" })
    lastName: string;

    @Column("varchar", { name: "JMBG", length: 45, default: "" })
    jmbg: string;

    @Column("varchar", { name: "PHONE", length: 45, default: "" })
    phone: string;

    @Column("varchar", { name: "CITY", length: 45, default: "" })
    city: string;

    @Column("varchar", { name: "SCHOOL", length: 100, default: "" })
    school: string;

    @Column("varchar", { name: "EMAIL", length: 100 })
    email: string;

    @Column("text", { name: "PASSWORD" })
    password: string;

    @Column("bool", { name: "DELETED", default: false })
    deleted: boolean

    @ManyToOne(() => Roles, (role) => role.idRole)
    role: Roles

    @ManyToMany(() => Jobs, (jobs) => jobs.idJob)
    jobs: Jobs[];
}

// @Column("int", { name: "ID_TIPA" })
// idTipa: number | null;

// @Column("int", { name: "ID_KANDIDATA", nullable: true })
// idKandidata: number | null;


// @JoinColumn([{ name: "ID_KANDIDATA", referencedColumnName: "idKandidata" }])
// idKandidata: Kandidati;

// @ManyToOne(() => TipKorisnika, (tipKorisnika) => tipKorisnika.korisnici, {
//     onDelete: "RESTRICT",
//     onUpdate: "RESTRICT",
// })
// @JoinColumn([{ name: "ID_TIPA", referencedColumnName: "idTipa" }])
// idTipa: TipKorisnika;
