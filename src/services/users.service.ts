import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Roles } from "src/entity/entities/Roles.entity";
import { Users } from "src/entity/entities/Users.entity";
import { UsersDTO } from "src/types/User.type";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(Roles)
        private readonly rolesRepository: Repository<Roles>
    ) { }

    // Lifecycle hook to initialize roles and admin user
    async onModuleInit() {
        await this.initializeRoles();
        await this.initializeAdminUser();
    }

    // Check and create predefined roles
    private async initializeRoles() {
        const rolesToCreate = ['admin', 'employee', 'candidat'];

        for (const roleName of rolesToCreate) {
            const existingRole = await this.rolesRepository.findOne({ where: { name: roleName } });
            if (!existingRole) {
                const newRole = this.rolesRepository.create({ name: roleName });
                await this.rolesRepository.save(newRole);
                console.log(`Role created: ${roleName}`);
            } else {
                console.log(`Role already exists: ${roleName}`);
            }
        }
    }

    // Check and create admin user
    private async initializeAdminUser() {
        const adminEmail = 'admin@oroz.com';
        const existingUser = await this.usersRepository.findOne({ where: { email: adminEmail, deleted: false } });

        if (!existingUser) {
            const adminRole = await this.rolesRepository.findOne({ where: { name: 'admin' } });
            if (!adminRole) {
                console.error("Admin role not found. Cannot create admin user.");
                return;
            }

            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash('admin', salt);

            const newUser = this.usersRepository.create({
                firstName: 'Admin',
                lastName: 'Oroz',
                email: adminEmail,
                password: hashedPassword,
                deleted: false,
                role: adminRole,
                jobs: [],
            });

            await this.usersRepository.save(newUser);
            console.log('Admin user created with email admin@oroz.com');
        } else {
            console.log('Admin user already exists.');
        }
    }
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