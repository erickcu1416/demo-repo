import { SongsService } from '@application/services/songs.service';
import { SongI } from '@domain/interface/songs/songs.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class SongUpdateeCase {
    constructor(private readonly _song: SongsService) {}

    async execute(Song:SongI): Promise<HttpException> {
        try {
            const user_create = await this._song.updateSong(Song);
            return new HttpException(user_create, HttpStatus.ACCEPTED)
        } catch (error) {
            console.log("errors", error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST,
            );
        }
    }
 }
 