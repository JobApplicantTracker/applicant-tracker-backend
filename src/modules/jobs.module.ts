import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm'
import { JobsController } from 'src/controlers/jobs.controller';
import { Jobs } from 'src/entity/entities/Jobs.entity';
import { Users } from 'src/entity/entities/Users.entity';
import { JobsService } from 'src/services/jobs.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Jobs, Users])],
    controllers: [JobsController],
    providers: [JobsService, JwtService],
})
export class JobsModule { }