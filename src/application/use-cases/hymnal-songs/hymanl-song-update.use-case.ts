import { HymnalSongI } from '../../../domain/interface/hymnal_songs/hymnal_songs_create.interface';
import { HymnalSongsService } from '@application/services/hymnal-songs.service';
import { HymnalSongUpdateI } from '@domain/interface/hymnal_songs/hymnal_songs_update.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class HymnalSongUpdateeCase {
    constructor(private readonly _hymnal: HymnalSongsService) {}

    async execute(hymnalSong:HymnalSongUpdateI): Promise<HttpException> {
        try {
            const user_create = await this._hymnal.updateHymnalSong(hymnalSong);
            return new HttpException(user_create, HttpStatus.ACCEPTED)
        } catch (error) {
            console.log("errors", error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST,
            );
        }
    }
 }
 