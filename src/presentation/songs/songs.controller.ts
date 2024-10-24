import { SongsByIdCase } from '@application/use-cases/songs/song-by-id.use-case';
import { SongCreateCase } from '@application/use-cases/songs/song-create.use-casey';
import { SongUpdateeCase } from '@application/use-cases/songs/song-update.use-case';
import { SongsByUserCase } from '@application/use-cases/songs/songs-by-user.use-case';
import { SongsUpdateDto } from '@domain/dto/songs/songs-update.dto';
import { SongsCreateDto } from '@domain/dto/songs/songs.dto';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

@Controller("songs")
export class SongsController {
    constructor(
        private readonly songCreateCase: SongCreateCase,
        private readonly songUpdateeCase: SongUpdateeCase,
        private readonly songsByIdCase: SongsByIdCase,
        private readonly songsByUserCase: SongsByUserCase
    ) { }

    @Post('song-create')
    async createSong(
        @Body() song: SongsCreateDto
    ) {
        return this.songCreateCase.execute(song);
    }

    @Patch('song-update')
    async updateSong(
        @Body() song: SongsUpdateDto
    ) {
        return this.songUpdateeCase.execute(song);
    }

    @Get('song/:id')
    async getSongById(
        @Param('id') id: string
    ) {
        return this.songsByIdCase.execute(id);
    }

    @Get()
    async getSongsByUser() {
        /* const user = "f8eLtO8OXjW59mIJiZqQSDLUxen2" */
        const user = "f9CQUJunC9SqU1rfSG3ew7TVXve2"
        return this.songsByUserCase.execute(user);
    }
}
