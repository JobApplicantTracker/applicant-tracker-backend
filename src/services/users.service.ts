import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Roles } from "src/entity/entities/Roles.entity";
import { Users } from "src/entity/entities/Users.entity";
import { UsersDTO } from "src/types/User.type";
import { FindOneOptions, Repository } from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(Roles)
        private readonly rolesRepository: Repository<Roles>
    ) { }

    async findAll(): Promise<Users[]> {
        return await this.usersRepository
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.jobs", "job", "job.deleted = false")  // Filter jobs where deleted is false
            .where("user.deleted = true")  // Find users where deleted is true
            .getMany();
    }

    async findById(id: number): Promise<Users | null> {
        return await this.usersRepository
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.jobs", "job", "job.deleted = false") // Filter jobs where deleted is false
            .where("user.idUser = :id", { id })
            .getOne();
    }

    async findByEmail(email: string): Promise<Users | null> {
        return await this.usersRepository.findOne({
            where: {
                email: email,
                deleted: false
            }
        })
    }

    async createUser(data: UsersDTO): Promise<boolean> {
        try {
            const role = await this.rolesRepository.findOne({ where: { idRole: data.idRole } });

            if (!role) {
                throw new Error("Role not found");
            }

            const newUser = this.usersRepository.create({
                ...data,
                role: role,
                jobs: [],
                deleted: false
            });

            await this.usersRepository.save(newUser);
            return true;
        } catch (error) {
            console.error("Error creating user:", error);
            return false;
        }
    }

    async deleteUser(id: number): Promise<boolean> {
        try {
            const user = await this.usersRepository.findOne({ where: { idUser: id } })
            user.deleted = true
            await this.usersRepository.save(user)
            return true
        } catch (error) {
            console.error(error)
            return false;
        }
    }
}