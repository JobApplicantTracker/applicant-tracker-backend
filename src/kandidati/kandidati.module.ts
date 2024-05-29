import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kandidati } from 'src/entity/entities/Kandidati.entity';
import { KandidatiController } from './kandidati.controller';
import { KandidatiService } from './kandidati.service';

@Module({
    imports: [TypeOrmModule.forFeature([Kandidati])],
    controllers: [KandidatiController],
    providers: [KandidatiService]
})
export class KandidatiModule { }