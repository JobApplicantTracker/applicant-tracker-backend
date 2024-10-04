import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Jobs } from "src/entity/entities/Jobs.entity";
import { Users } from "src/entity/entities/Users.entity";
import { JobDTO } from "src/types/Job.type";
import { Repository } from "typeorm";

@Injectable()
export class JobsService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        @InjectRepository(Jobs)
        private jobsRepository: Repository<Jobs>
    ) { }

    async findAll(): Promise<Jobs[]> {
        return await this.jobsRepository.find({
            where: {
                deleted: false
            }
        })
    }
    async findOneJob(id: number): Promise<Jobs | null> {
        return await this.jobsRepository
            .createQueryBuilder("job")
            .leftJoinAndSelect("job.candidates", "user", "user.deleted = false")
            .where("job.idJob = :id", { id })
            .andWhere("job.deleted = false")
            .getOne();
    }
    async createJob(data: JobDTO, creatorEmail: string): Promise<boolean> {
        try {
            // Find the creator user based on creatorId
            const creator = await this.usersRepository.findOne({ where: { email: creatorEmail } });

            if (!creator) {
                throw new Error("Creator user not found");
            }

            const newJob = this.jobsRepository.create({
                ...data,
                creator,
                deleted: false,
            });

            await this.jobsRepository.save(newJob);
            return true;
        } catch (error) {
            console.error("Error creating job:", error);
            return false;
        }
    }
    async deleteJob(id: number): Promise<boolean> {
        try {
            const job = await this.jobsRepository.findOne({ where: { idJob: id } })
            job.deleted = true
            await this.jobsRepository.save(job)
            return true
        } catch (error) {
            console.error(error)
            return false;
        }
    }
}