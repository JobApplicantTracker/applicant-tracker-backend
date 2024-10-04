import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users.entity";

@Entity("roles", { schema: "applicant-tracker-database" })
export class Roles {

    @PrimaryGeneratedColumn({ type: "int", name: "ID_ROLE" })
    idRole: number;

    @Column("varchar", { name: "NAME", length: 45 })
    name: string;

    @OneToMany(() => Users, (user) => user.role)
    users: Users[];
}