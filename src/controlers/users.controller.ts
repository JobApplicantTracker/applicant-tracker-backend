import { Body, Controller, Get, Param, Patch, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { AdminGuard } from "src/auth/guard/admin.guard";
import { EmployeeGuard } from "src/auth/guard/employee.guard";
import { JwtGuard } from "src/auth/guard/jwt.guard";
import { UsersService } from "src/services/users.service";
import { UpdateUserDTO, UsersDTO } from "src/types/User.type";

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
    @UseGuards(JwtGuard)
    async getSingleUser(@Param('id') id: number, @Request() req) {
        let allowed = false
        if (req.user.sub.role == 'candidat' && req.user.sub.idUser == id) {
            allowed = true
        } else if (req.user.sub.role == 'employee' || req.user.sub.role == 'admin') {
            allowed = true
        }
        if (allowed) {
            return await this.usersService.findById(id)
        } else {
            return null
        }
    }

    @Patch("delete/:id")
    @UseGuards(AdminGuard)
    async deleteUser(@Param("id") id: number) {
        return await this.usersService.deleteUser(id)
    }

    @Put("/update/:id")
    @UseGuards(JwtGuard)
    async updateUser(
        @Request() req,
        @Param("id") id: number,
        @Body() data: UpdateUserDTO) {
        const roleAllowed = req.user.sub.role == 'admin'
        let allowed = false
        if (req.user.sub.role == 'candidat' && req.user.sub.idUser == id) {
            allowed = true
        } else if (req.user.sub.role == 'employee' || req.user.sub.role == 'admin') {
            allowed = true
        }
        if (allowed) {
            return await this.usersService.updateUser(id, data, roleAllowed)
        } else {
            return false
        }
    }

    @Post("/create")
    @UseGuards(EmployeeGuard)
    async createUser(@Body() data: UsersDTO) {
        return await this.usersService.createUser(data)
    }
}