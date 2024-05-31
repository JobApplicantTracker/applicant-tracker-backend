import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { KandidatiService } from './kandidati.service';
import { KandidatDTO } from '../dtos/Kandidati.dto';

@Controller('kandidati')
export class KandidatiController {
    constructor(private kandidatService: KandidatiService) { }
    @Get()
    async getKandidati() {
        return await this.kandidatService.findAll();
    }

    @Get("/poslovi")
    async getTipovi() {
        return await this.kandidatService.getTioviPosla();
    }

    @Get("/diplome")
    async getDiploms() {
        return await this.kandidatService.getDiplome();
    }

    @Post()
    async createKandidat(@Body() createKandidatDto: KandidatDTO) {
        const { ...kandidatDetails } = createKandidatDto;
        await this.kandidatService.createKandidat(createKandidatDto);
    }


    @Put(':id')
    async updateKandidatById(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateKandidatDto: KandidatDTO
    ) {
        const { ...kandidatDetails } = updateKandidatDto;
        await this.kandidatService.updateKandidat(id, kandidatDetails);
    }
    @Delete(':id')
    async deleteKandidatById(
        @Param("id", ParseIntPipe) id: number
    ) {
        await this.kandidatService.deleteKandidat(id);
    }
}
