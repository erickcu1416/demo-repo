import { HymnalSongsService } from '@application/services/hymnal-songs.service';
import { HymnalsService } from '@application/services/hymnals.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class HymnalSongUseCase {
    constructor(private readonly _hymnal: HymnalSongsService) {}

    async execute(hymnalId:string): Promise<HttpException> {
        try {
            const user_create = await this._hymnal.getHymnalSong(hymnalId);
            return new HttpException(user_create, HttpStatus.ACCEPTED)
        } catch (error) {
            console.log("errors", error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST,
            );
        }
    }
 }
 