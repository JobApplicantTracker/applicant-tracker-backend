import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Roles } from "src/entity/entities/Roles.entity";
import { Users } from "src/entity/entities/Users.entity";
import { UpdateUserDTO, UsersDTO } from "src/types/User.type";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Universities } from "src/entity/entities/Universities.entity";

@Injectable()
export class UsersService implements OnModuleInit {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(Roles)
        private readonly rolesRepository: Repository<Roles>,
        @InjectRepository(Universities)
        private readonly universitiesService: Repository<Universities>
    ) { }

    // Lifecycle hook to initialize roles and admin user
    async onModuleInit() {
        await this.initializeRoles();
        await this.initializeAdminUser();
        await this.initializeUniversities();
    }

    // Check and create predefined roles
    private async initializeRoles() {
        const rolesToCreate = ['admin', 'employee', 'candidat'];

        for (const roleName of rolesToCreate) {
            const existingRole = await this.rolesRepository.findOne({ where: { name: roleName } });
            if (!existingRole) {
                const newRole = this.rolesRepository.create({ name: roleName });
                await this.rolesRepository.save(newRole);
            }
        }
    }

    private async initializeUniversities() {
        const allUniversities = [
            "Pravni fakultet za privredu i pravosuđe, Batočina",
            "Alfa BK univerzitet, Beograd",
            "Akademija umetnosti, Beograd",
            "Fakultet informacionih tehnologija, Beograd",
            "Fakultet za matematiku i računarske nauke, Beograd",
            "Fakultet za menadžment u sportu, Beograd",
            "Fakultet za strane jezike, Beograd",
            "Fakultet za finansije, bankarstvo i reviziju, Beograd",
            "Arhitektonski fakultet, Beograd",
            "Biološki fakultet, Beograd",
            "Geografski fakultet, Beograd",
            "Građevinski fakultet, Beograd",
            "Ekonomski fakultet, Beograd",
            "Elektrotehnički fakultet, Beograd",
            "Matematički fakultet, Beograd",
            "Mašinski fakultet, Beograd",
            "Medicinski fakultet, Beograd",
            "Poljoprivredni fakultet, Beograd",
            "Pravni fakultet, Beograd",
            "Pravoslavni bogoslovski fakultet, Beograd",
            "Rudarsko-geološki fakultet, Beograd",
            "Saobraćajni fakultet, Beograd",
            "Stomatološki fakultet, Beograd",
            "Tehnološko-metalurški fakultet, Beograd",
            "Učiteljski fakultet, Beograd",
            "Fakultet bezbednosti, Beograd",
            "Fakultet veterinarske medicine, Beograd",
            "Fakultet za fizičku hemiju, Beograd",
            "Fakultet za specijalnu edukaciju i rehabilitaciju, Beograd",
            "Fakultet organizacionih nauka, Beograd",
            "Fakultet političkih nauka, Beograd",
            "Fakultet sporta i fizičkog vaspitanja, Beograd",
            "Farmaceutski fakultet, Beograd",
            "Fizički fakultet, Beograd",
            "Filozofski fakultet, Beograd",
            "Filološki fakultet, Beograd",
            "Hemijski fakultet, Beograd",
            "Šumarski fakultet, Beograd",
            "Fakultet za projektni i inovacioni menadžment, Beograd",
            "Departman informatike i računarstva, Beograd",
            "Departman kriminalistike, Beograd",
            "Departman forenzičkog inženjerstva, Beograd",
            "Akademija klasičnog slikarstva, Beograd",
            "Poslovni i pravni fakultet, Beograd",
            "Fakultet digitalnih umetnosti, Beograd",
            "Fakultet informacionih tehnologija, Beograd",
            "Fakultet za ekonomiju, finansije i administraciju, Beograd",
            "Fakultet za menadžment, Beograd",
            "Fakultet za primenjenu ekologiju, Beograd",
            "Fakultet za strane jezike, Beograd",
            "Vojna akademija, Beograd",
            "Vojnomedicinska akademija, Beograd",
            "Evropski fakultet, Beograd",
            "Pravni fakultet za privredu i pravosuđe, Beograd",
            "Fakultet društvenih nauka, Beograd",
            "Fakultet za evropske pravno-političke studije, Beograd",
            "Fakultet za ekonomiju i inženjerski menadžment, Beograd",
            "Fakultet za primenjeni menadžment, ekonomiju i finansije, Beograd",
            "Fakultet organizacionih studija, Beograd",
            "Fakultet savremenih umetnosti, Beograd",
            "Poslovni fakultet, Beograd",
            "Tehnički fakultet, Beograd",
            "Fakultet za informatiku i računarstvo, Beograd",
            "Fakultet za medije i komunikacije, Beograd",
            "Fakultet za turistički i hotelijerski menadžment, Beograd",
            "Fakultet za fizičku kulturu i menadžment u sportu, Beograd",
            "Fakultet dramskih umetnosti, Beograd",
            "Fakultet likovnih umetnosti, Beograd",
            "Fakultet muzičke umetnosti, Beograd",
            "Fakultet primenjenih umetnosti, Beograd",
            "Beogradska bankarska akademija, Beograd",
            "Pravni fakultet, Beograd",
            "Računarski fakultet, Beograd",
            "Fakultet za građevinski menadžment, Beograd",
            "Fakultet za diplomatiju i bezbednost, Beograd",
            "Fakultet za ekologiju i zaštitu životne sredine, Beograd",
            "Fakultet za ekonomiju i finansije, Beograd",
            "Fakultet za informatiku i računarstvo, Beograd",
            "Fakultet za informacione tehnologije i inženjerstvo, Beograd",
            "Fakultet za inženjerski menadžment, Beograd",
            "Fakultet za međunarodnu politiku i bezbednost, Beograd",
            "Fakultet za poslovne studije i pravo, Beograd",
            "Fakultet za preduzetnički biznis i menadžment nekretnina, Beograd",
            "Fakultet za sport, Beograd",
            "Tehnički fakultet, Bor",
            "Ekonomski fakultet, Bujanovac",
            "Fakultet društvenih nauka, Valjevo",
            "Fakultet zdravstvenih i poslovnih studija, Valjevo",
            "Pedagoški fakultet, Vranje",
            "Pravni fakultet, Vranje",
            "Fakultet za hotelijerstvo i turizam, Vrnjačka Banja",
            "Fakultet umetnosti, Zvečan",
            "Tehnički fakultet, Zrenjanin",
            "Poljoprivredni fakultet, Zubin Potok",
            "Fakultet pedagoških nauka, Jagodina",
            "Ekonomski fakultet, Kosovska Mitrovica",
            "Medicinski fakultet, Kosovska Mitrovica",
            "Pravni fakultet, Kosovska Mitrovica",
            "Priručno-matematički fakultet, Kosovska Mitrovica",
            "Fakultet tehničkih nauka, Kosovska Mitrovica",
            "Filozofski fakultet, Kosovska Mitrovica",
            "Ekonomski fakultet, Kragujevac",
            "Pravni fakultet, Kragujevac",
            "Priručno-matematički fakultet, Kragujevac",
            "Fakultet inženjerskih nauka, Kragujevac",
            "Fakultet medicinskih nauka, Kragujevac",
            "Filološko-umetnički fakultet, Kragujevac",
            "Fakultet društvenih nauka, Kragujevac",
            "Fakultet za mašinstvo i građevinarstvo, Kraljevo",
            "Fakultet društvenih nauka, Kraljevo",
            "Poljoprivredni fakultet, Kruševac",
            "Učiteljski fakultet, Leposavić",
            "Fakultet za fizičku kulturu, Leposavić",
            "Tehnološki fakultet, Leskovac",
            "Građevinsko-arhitektonski fakultet, Niš",
            "Ekonomski fakultet, Niš",
            "Elektroinženjerski fakultet, Niš",
            "Mašinski fakultet, Niš",
            "Medicinski fakultet, Niš",
            "Pravni fakultet, Niš",
            "Priručno-matematički fakultet, Niš",
            "Fakultet zaštite na radu, Niš",
            "Fakultet sporta i fizičkog vaspitanja, Niš",
            "Fakultet umetnosti, Niš",
            "Filozofski fakultet, Niš",
            "Fakultet digitalnih umetnosti, Niš",
            "Fakultet informacionih tehnologija, Niš",
            "Fakultet za menadžment, Niš",
            "Fakultet za strane jezike, Niš",
            "Pravni fakultet za privredu i pravosuđe, Niš",
            "Fakultet društvenih nauka, Niš",
            "Tehnički fakultet, Niš",
            "Fakultet za turizam, Zrenjanin",
            "Fakultet za ekonomiju i menadžment, Zrenjanin"
        ]
        const universitiesToSave = []
        const current = await this.universitiesService.find()
        for (const uni of allUniversities) {
            universitiesToSave.push(this.universitiesService.create({ name: uni }))
        }
        if (universitiesToSave.length > 0 && current.length == 0) {
            await this.universitiesService.save(universitiesToSave)
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
        }
    }
    async findAll(): Promise<Users[]> {
        return await this.usersRepository
            .createQueryBuilder("users")
            .leftJoinAndSelect("users.role", "role")
            .leftJoinAndSelect("users.school", "school")
            .where("users.deleted = false")  // Find users where deleted is true
            .getMany();
    }

    async findById(idUser: number): Promise<Users | null> {
        return await this.usersRepository.findOne({
            where: {
                idUser: idUser,
                deleted: false
            },
            relations: ["role", "school"],
        })
    }

    async findByEmail(email: string): Promise<Users | null> {
        return await this.usersRepository.findOne({
            where: {
                email: email,
                deleted: false
            },
            relations: ["role"],
        })
    }

    async createUser(data: UsersDTO): Promise<boolean> {
        try {
            const role = await this.rolesRepository.findOne({ where: { idRole: data.idRole } });
            const uni = await this.universitiesService.findOne({ where: { idUniversity: data.idUniversity } })
            if (!role) {
                throw new Error("Role not found");
            }
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(data.password, salt);
            const newUser = this.usersRepository.create({
                ...data,
                password: hashedPassword,
                role: role,
                jobs: [],
                school: uni,
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

    async updateUser(id: number, data: UpdateUserDTO, roleAllowed: boolean): Promise<boolean> {
        try {
            let user = await this.findById(id);
            const currRole = user.role
            user = { ...user, ...data }
            if (!roleAllowed) {
                user.role = currRole
            }
            await this.usersRepository.save(user)
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }
}