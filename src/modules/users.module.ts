import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersController } from 'src/controlers/users.controller';
import { Jobs } from 'src/entity/entities/Jobs.entity';
import { Roles } from 'src/entity/entities/Roles.entity';
import { Users } from 'src/entity/entities/Users.entity';
import { UsersService } from 'src/services/users.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Jobs, Roles, Users])],
    controllers: [UsersController],
    providers: [UsersService, JwtService],
})
export class UsersModule { }