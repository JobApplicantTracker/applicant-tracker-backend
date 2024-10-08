import { Roles } from "src/entity/entities/Roles.entity";
import { Universities } from "src/entity/entities/Universities.entity";

export type UsersDTO = {
    firstName: string;

    lastName: string;

    jmbg: string;

    phone: string;

    city: string;

    gender: string;

    school: string;

    email: string;

    password: string;

    idRole: number

    idUniversity: number
}

export type UpdateUserDTO = {
    firstName: string;

    lastName: string;

    jmbg: string;

    phone: string;

    city: string;

    gender: string;

    school: Universities

    role: Roles
}

export type RoleDTO = {
    idRole: number,
    name: string
}