import { SongsService } from '@application/services/songs.service';
import { SongsCreateDto } from '@domain/dto/songs/songs.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class SongsByIdCase {
    constructor(private readonly _song: SongsService) { }
    async execute(id:string): Promise<HttpException> {
        try {
            const user_create = await this._song.getSong(id);
            return new HttpException(user_create, HttpStatus.ACCEPTED)
        } catch (error) {
            console.log("errors", error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST,
            );
        }
    }
}
