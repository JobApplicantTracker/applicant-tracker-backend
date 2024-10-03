import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { RolesController } from 'src/controlers/roles.controller';
import { Roles } from 'src/entity/entities/Roles.entity';
import { Users } from 'src/entity/entities/Users.entity';
import { RolesService } from 'src/services/roles.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Roles, Users])],
    controllers: [RolesController],
    providers: [RolesService],
})
export class RolesModule { }