import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { EmployeeGuard } from "src/auth/guard/employee.guard";
import { JobsService } from "src/services/jobs.service";
import { JobDTO } from "src/types/Job.type";

@Controller('jobs')
export class JobsController {
    constructor(
        private jobsService: JobsService,
    ) { }

    @Get()
    async getAllJobs() {
        return this.jobsService.findAll()
    }

    @Post("create")
    @UseGuards(EmployeeGuard)
    async createJob(@Request() req, @Body() data: JobDTO) {
        return this.jobsService.createJob(data, req.user.email)
    }

    @Patch("delete/:id")
    @UseGuards(EmployeeGuard)
    async deleteJob(@Param('id') id: number) {
        return this.jobsService.deleteJob(id)
    }
}