import { Controller, Get, Param, Patch, Query, UseGuards } from "@nestjs/common";
import { AdminGuard } from "src/auth/guard/admin.guard";
import { EmployeeGuard } from "src/auth/guard/employee.guard";
import { UsersService } from "src/services/users.service";

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService,
    ) { }
    @Get()
    @UseGuards(EmployeeGuard)
    async getAllUsers() {
        return await this.usersService.findAll()
    }

    @Get("user/:id")
    @UseGuards(EmployeeGuard)
    async getSingleUser(@Param('id') id: number) {
        return await this.usersService.findById(id)
    }

    @Patch("delete/:id")
    @UseGuards(AdminGuard)
    async deleteUser(@Param("id") id: number) {
        return await this.usersService.deleteUser(id)
    }
}