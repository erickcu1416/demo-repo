import { SharedModule } from '@infrastructure/module/shared.module';
import { SongsController } from './songs.controller';
import { Module } from '@nestjs/common';
import { SongsService } from '@application/services/songs.service';
import { SongsByUserCase } from '@application/use-cases/songs/songs-by-user.use-case';
import { SongUpdateeCase } from '@application/use-cases/songs/song-update.use-case';
import { SongCreateCase } from '@application/use-cases/songs/song-create.use-casey';
import { SongsByIdCase } from '@application/use-cases/songs/song-by-id.use-case';

@Module({
    imports: [SharedModule],
    controllers: [
        SongsController,
    ],
    providers: [
        SongsService,
        SongsByIdCase,
        SongCreateCase,
        SongUpdateeCase,
        SongsByUserCase
    ],
})
export class SongsModule { }
