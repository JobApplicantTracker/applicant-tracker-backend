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

    @Post()
    async createKorisnik(
        @Body() createKorisnikDto: BasicKorisnikDTO
    ) {
        const { ...korisnikDetails } = createKorisnikDto;
        await this.korisniciService.createKorisnici(createKorisnikDto);
    }
    @Get(":id")
    async getKorisnik(
        @Param('id') id: number
    ) {
        return await this.korisniciService.findById(id);
    }
    @Delete(':id')
    async deleteKandidatById(
        @Param("id", ParseIntPipe) id: number
    ) {
        await this.korisniciService.deleteKorisnik(id);
    }
}