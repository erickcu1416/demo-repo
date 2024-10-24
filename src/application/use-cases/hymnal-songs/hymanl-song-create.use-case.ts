import { HymnalSongI } from '../../../domain/interface/hymnal_songs/hymnal_songs_create.interface';
import { HymnalSongsService } from '@application/services/hymnal-songs.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class HymnalSongCreateUseCase {
    constructor(private readonly _hymnal: HymnalSongsService) {}

    async execute(hymnalSong:HymnalSongI): Promise<HttpException> {
        try {
            const user_create = await this._hymnal.createHymnalSong(hymnalSong);
            return new HttpException(user_create, HttpStatus.ACCEPTED)
        } catch (error) {
            console.log("errors", error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST,
            );
        }
    }
 }
 