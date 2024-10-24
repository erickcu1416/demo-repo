import { HymnalSongsService } from '@application/services/hymnal-songs.service';
import { HymnalsService } from '@application/services/hymnals.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class HymnalSongsUseCase {
    constructor(private readonly _hymnal: HymnalSongsService) {}

    async execute(id:string): Promise<HttpException> {
        try {
            const user_create = await this._hymnal.getHymnalSongs(id);
            return new HttpException(user_create, HttpStatus.ACCEPTED)
        } catch (error) {
            console.log("errors", error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST,
            );
        }
    }
 }
 