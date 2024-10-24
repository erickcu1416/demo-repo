import { SONGS } from '@domain/constants/songs';
import { SongI } from '@domain/interface/songs/songs.interface';
import { FirebaseService } from '@infrastructure/service/firebase.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService { 
    constructor(
        private readonly firebaseService: FirebaseService
    ) {}

    public async getSongsByUser(user_id:string="f8eLtO8OXjW59mIJiZqQSDLUxen2") {
        try {
            const query: QueryParams = {
                filters: [
                    { attr: 'createdBy', operation: '==', value: user_id },
                ],
                sort: {
                    attr: 'createdAt',
                    asc: false,
                }
            };

            return await this.firebaseService.getDocumentFilters(SONGS.COLLECTION, query);

        } catch (error) {
            console.error('Error getting songs', error);
            return error.message;
        }
    }

    public async getSong(songId: string) {
        try {
            return await this.firebaseService.getCollection(SONGS.COLLECTION, songId);
        } catch (error) {
            return error.message
        }
    }

    public async createSong(song: SongI) {
        try {
            /* song.createdBy = "f8eLtO8OXjW59mIJiZqQSDLUxen2"; */
            song.createdBy = "f9CQUJunC9SqU1rfSG3ew7TVXve2";
            await this.firebaseService.addDocument(SONGS.COLLECTION, song);
            return SONGS.CREATE;
        } catch (error) {
            return error.message;
        }
    }

    public async updateSong(song: SongI) {
        try {
            await this.firebaseService.updateDocument(SONGS.COLLECTION, song);
            return SONGS.UPDATE;
        } catch (error) {
            return error.message;
        }
    }

}
