import { Roles } from "src/entity/entities/Roles.entity";

export type UsersDTO = {
    firstName: string;

    lastName: string;

    jmbg: string;

    phone: string;

    city: string;

    school: string;

    email: string;

    password: string;

    idRole: number
}

export type UpdateUserDTO = {
    firstName: string;

    lastName: string;

    jmbg: string;

    phone: string;

    city: string;

    school: string

    role: Roles
}

export type RoleDTO = {
    idRole: number,
    name: string
}