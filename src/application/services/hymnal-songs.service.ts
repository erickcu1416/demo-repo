import { HYMNALSONGS } from '@domain/constants/hymnal-songs';
import { HymnalSongI } from '@domain/interface/hymnal_songs/hymnal_songs_create.interface';
import { HymnalSongUpdateI } from '@domain/interface/hymnal_songs/hymnal_songs_update.interface';
import { FirebaseService } from '@infrastructure/service/firebase.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HymnalSongsService {
    constructor(
        private readonly firebaseService: FirebaseService
    ) { }

    public async getHymnalSong(hymnalSongId: string) {
        try {
            return await this.firebaseService.getCollection(HYMNALSONGS.COLLECTION, hymnalSongId);
        } catch (error) {
            return error.message
        }
    }

    public async getHymnalSongs(hymnalId: string) {
        try {
            const query: QueryParams = {
                filters: [
                    { attr: 'id_hymnal', operation: '==', value: hymnalId },
                ],
                sort: {
                    attr: 'createdAt',
                    asc: false,
                }
            };

            return await this.firebaseService.getDocumentFilters(HYMNALSONGS.COLLECTION, query);
        } catch (error) {
            return error.message;
        }
    }

    public async createHymnalSong(hymnalSong: HymnalSongI) {
        try {
            await this.firebaseService.addDocument(HYMNALSONGS.COLLECTION, hymnalSong);
            return HYMNALSONGS.CREATE;
        } catch (error) {
            return error.message;
        }
    }

    public async updateHymnalSong(hymnalSong: HymnalSongUpdateI) {
        try {
            await this.firebaseService.updateDocument(HYMNALSONGS.COLLECTION, hymnalSong);
            return HYMNALSONGS.UPDATE;
        } catch (error) {
            return error.message;
        }
    }
}
