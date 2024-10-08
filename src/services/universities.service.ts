import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Universities } from "src/entity/entities/Universities.entity";
import { Repository } from "typeorm";

@Injectable()
export class UniversitiesService {
    constructor(
        @InjectRepository(Universities)
        private readonly universitiesService: Repository<Universities>
    ) { }

    async getAll(): Promise<Universities[]> {
        return await this.universitiesService.find()
    }
}