import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users.entity";

@Entity("universities", { schema: "applicant-tracker-database" })
export class Universities {

    @PrimaryGeneratedColumn({ type: "int", name: "ID_UNIVERSITY" })
    idUniversity: number;

    @Column("varchar", { name: "NAME", length: 100, default: '' })
    name: string;

    @OneToMany(() => Users, (user) => user.school)
    users: Users[];
}
