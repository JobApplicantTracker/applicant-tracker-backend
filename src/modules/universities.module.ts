import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UniversitiesController } from 'src/controlers/universities.controller';
import { Universities } from 'src/entity/entities/Universities.entity';
import { Users } from 'src/entity/entities/Users.entity';
import { UniversitiesService } from 'src/services/universities.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Universities, Users])],
    controllers: [UniversitiesController],
    providers: [UniversitiesService],
})
export class UniversitiesModule { }