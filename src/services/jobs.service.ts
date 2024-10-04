import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Jobs } from "src/entity/entities/Jobs.entity";
import { Users } from "src/entity/entities/Users.entity";
import { ApplyJobDto } from "src/types/ApplyJob.dto";
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

    async applyForJob(applyJobDto: ApplyJobDto): Promise<string> {
        const { userEmail, jobId } = applyJobDto;

        // Check if the user is an admin
        const user = await this.usersRepository.findOne({
            where: { email: userEmail },
            relations: ['role'],
        });

        if (!user) {
            return 'User not found.';
        }

        if (user.role.name === 'admin') {
            return 'Admins cannot apply for jobs.'
        }

        // Find the job
        const job = await this.jobsRepository.findOne({ where: { idJob: jobId }, relations: ["candidates"] });

        if (!job) {
            return 'Job not found.'
        }
        const candidates = job.candidates || [];
        // Check if the user has already applied for the job
        const alreadyApplied = candidates.some(candidate => candidate.idUser === user.idUser);

        if (alreadyApplied) {
            return 'Already applied for job.';
        }

        // Add the user to the job candidates
        candidates.push(user);
        job.candidates = candidates;
        await this.jobsRepository.save(job);

        return 'Successfully applied for job.';
    }

    async getJobsAppliedByUser(userId: number): Promise<Jobs[]> {
        return await this.jobsRepository
            .createQueryBuilder("job")
            .innerJoinAndSelect("job.candidates", "user") // Accessing candidates relationship
            .where("user.idUser = :id", { id: userId })
            .getMany();
    }
}