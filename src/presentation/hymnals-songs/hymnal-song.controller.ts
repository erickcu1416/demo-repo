import { HymnalSongCreateUseCase } from '@application/use-cases/hymnal-songs/hymanl-song-create.use-case';
import { HymnalSongsUseCase } from '@application/use-cases/hymnal-songs/hymanl-song-get-all.use-case';
import { HymnalSongUseCase } from '@application/use-cases/hymnal-songs/hymanl-song-get-id.use-case';
import { HymnalSongUpdateeCase } from '@application/use-cases/hymnal-songs/hymanl-song-update.use-case';
import { HymnalSongsCreateDto } from '@domain/dto/hymnals-songs/hymnal-songs-create.dto';
import { HymnalSongsUpdateDto } from '@domain/dto/hymnals-songs/hymnal-songs-updatedto';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

@Controller("hymnals-songs")
export class HymnalSongController { 
    constructor(
        private readonly hymnalSongCreateUseCase: HymnalSongCreateUseCase,
        private readonly hymnalSongsUseCase: HymnalSongsUseCase,
        private readonly hymnalSongUseCase: HymnalSongUseCase,
        private readonly hymnalSongUpdateeCase: HymnalSongUpdateeCase
    ){}

    @Post('hymnal-song-create')
    async createHymnalSong(
        @Body() hymnal: HymnalSongsCreateDto
    ) {
        return this.hymnalSongCreateUseCase.execute(hymnal);
    }

    
    @Patch('hymnal-song-update')
    async updateHymnalSong(
        @Body() hymnal: HymnalSongsUpdateDto
    ) {
        return this.hymnalSongUpdateeCase.execute(hymnal);
    }

    @Get('song-hymnal/:id')
    async getHymnalSongBySong(
        @Param('id') id: string
    ) {
        return this.hymnalSongUseCase.execute(id);
    }

    @Get('hymnal-songs/:id')
    async getSongsByHymnal(
        @Param('id') id: string
    ) {
        return this.hymnalSongsUseCase.execute(id);
    }
}
