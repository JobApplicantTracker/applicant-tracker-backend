import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { KandidatiService } from './kandidati.service';
import { CreateKandidatDTO, UpdateKandidatDTO } from './dtos/Kandidati.dto';

@Controller('kandidati')
export class KandidatiController {
    constructor(private kandidatService: KandidatiService) { }
    @Get()
    getKandidat() {
        return this.kandidatService.findKandidat();
    }

    @Post()
    createKandidat(@Body() createKandidatDto: CreateKandidatDTO) {
        const { ...kandidatDetails } = createKandidatDto;
        this.kandidatService.createKandidat(createKandidatDto);
    }

    @Put(':id')
    async updateKandidatById(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateKandidatDto: UpdateKandidatDTO
    ) {
        await this.kandidatService.updateKandidat(updateKandidatDto, id);
    }
    @Delete(':id')
    async deleteKandidatById(
        @Param("id", ParseIntPipe) id: number
    ) {
        await this.kandidatService.deleteKandidat(id);
    }
}