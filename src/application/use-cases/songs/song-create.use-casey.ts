import { SongsService } from '@application/services/songs.service';
import { SongI } from '@domain/interface/songs/songs.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class SongCreateCase {
    constructor(private readonly _song: SongsService) {}

    async execute(Song:SongI): Promise<HttpException> {
        try {
            const create = await this._song.createSong(Song);
            return new HttpException(create, HttpStatus.ACCEPTED)
        } catch (error) {
            console.log("errors", error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST,
            );
        }
    }
 }
 