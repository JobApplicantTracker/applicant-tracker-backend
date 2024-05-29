import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateKorisnikDTO } from './dtos/CreateKorisnik.dto';
import { KorisniciService } from './korisnici.service';
@Controller('user')
export class KorisniciController {
    constructor(private korisniciService: KorisniciService) { }

    @Get()
    getKorisnici() {
        return this.korisniciService.findKorisnici()
    }

    @Post()
    createKorisnik(
        @Body() createKorisnikDto: CreateKorisnikDTO
    ) {
        const { ...korisnikDetails } = createKorisnikDto;
        this.korisniciService.createKorisnici(createKorisnikDto);
    }
    @Get(":id")
    async getKorisnik(
        @Param('id') id: number
    ) {
        return await this.korisniciService.findById(id);
    }
}