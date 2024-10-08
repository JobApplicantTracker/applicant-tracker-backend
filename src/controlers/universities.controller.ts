import { Controller, Get } from "@nestjs/common";
import { Universities } from "src/entity/entities/Universities.entity";
import { UniversitiesService } from "src/services/universities.service";

@Controller('universities')
export class UniversitiesController {
    constructor(private universitiesService: UniversitiesService) { }
    @Get('')
    async getAllUniversities(): Promise<Universities[]> {
        return await this.universitiesService.getAll()
    }
}