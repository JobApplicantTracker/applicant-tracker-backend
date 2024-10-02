import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("roles", { schema: "orozdatabase" })
export class Roles {

    @PrimaryGeneratedColumn({ type: "int", name: "ID_ROLE" })
    idRole: number;

    @Column("varchar", { name: "NAME", length: 45 })
    name: string;
}