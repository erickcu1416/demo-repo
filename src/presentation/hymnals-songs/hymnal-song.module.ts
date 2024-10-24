import { SharedModule } from '@infrastructure/module/shared.module';
import { Module } from '@nestjs/common';
import { HymnalSongController } from './hymnal-song.controller';
import { HymnalSongsService } from '@application/services/hymnal-songs.service';
import { HymnalSongCreateUseCase } from '@application/use-cases/hymnal-songs/hymanl-song-create.use-case';
import { HymnalSongsUseCase } from '@application/use-cases/hymnal-songs/hymanl-song-get-all.use-case';
import { HymnalSongUseCase } from '@application/use-cases/hymnal-songs/hymanl-song-get-id.use-case';
import { HymnalSongUpdateeCase } from '@application/use-cases/hymnal-songs/hymanl-song-update.use-case';

@Module({
    imports: [SharedModule],
    controllers: [HymnalSongController],
    providers: [
        HymnalSongsService,
        HymnalSongCreateUseCase,
        HymnalSongsUseCase,
        HymnalSongUseCase,
        HymnalSongUpdateeCase
    ],
})
export class HymnalSongModule { }
