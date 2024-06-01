import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { BasicKorisnikDTO } from '../dtos/Korisnik.dto';
import { KorisniciService } from './korisnici.service';
@Controller('user')
export class KorisniciController {
    constructor(private korisniciService: KorisniciService) { }

    @Get()
    async getKorisnici() {
        return await this.korisniciService.findAll()
    }

    @Get("/types")
    async getTipoviKorisnika() {
        return await this.korisniciService.getTipoviKorisnika()
    }

    @Get(":id")
    async getKorisnik(
        @Param('id') id: number
    ) {
        return await this.korisniciService.findById(id);
    }

    @Post()
    async createKorisnik(@Body() dto: BasicKorisnikDTO) {
        const { ...korisnikDetails } = dto;
        return await this.korisniciService.createKorisnici(korisnikDetails);
    }

    @Delete(':id')
    async deleteKandidatById(
        @Param("id", ParseIntPipe) id: number
    ) {
        await this.korisniciService.deleteKorisnik(id);
    }
}