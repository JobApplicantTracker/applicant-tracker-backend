import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { EmployeeGuard } from "src/auth/guard/employee.guard";
import { JwtGuard } from "src/auth/guard/jwt.guard";
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

    @Post("/create")
    @UseGuards(EmployeeGuard)
    async createJob(@Request() req, @Body() data: JobDTO) {
        return this.jobsService.createJob(data, req.user.email)
    }

    @Patch("/delete/:id")
    @UseGuards(EmployeeGuard)
    async deleteJob(@Param('id') id: number) {
        return this.jobsService.deleteJob(id)
    }

    @Get("/job/:id")
    async getSingleJob(
        @Param('id') id: number
    ) {
        return this.jobsService.findOneJob(id)
    }

    @Post('/apply/:id')
    @UseGuards(JwtGuard)  // Ensure the user is logged in
    async applyForJob(@Param('id') id: number,
        @Request() req) {
        return await this.jobsService.applyForJob({ jobId: id, userEmail: req.user.email });
    }

    @UseGuards(JwtGuard)  // Ensure user is authenticated
    @Get('/user/:id')
    async getJobsAppliedByUser(@Request() req, @Param('id') id: number,) {
        const userId = req.user.idUser;
        return await this.jobsService.getJobsAppliedByUser(id);
    }
}