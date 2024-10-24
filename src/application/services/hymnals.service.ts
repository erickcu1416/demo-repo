import { HYMNALS } from '@domain/constants/hymnals';
import { HymnalI } from '@domain/interface/hymnals/hymnal.interface';
import { FirebaseService } from '@infrastructure/service/firebase.service';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HymnalsService {
    constructor(
        private readonly firebaseService: FirebaseService
    ) { }

    public async getAll() {
        try {
            const getAll = await this.firebaseService.getDocuments(HYMNALS.COLLECTION);
            const himnos = await firstValueFrom(getAll);
            return himnos
        } catch (error) {
            return error.message;
        }
    }

    public async createHimno(hymnal: HymnalI) {
        try {
            await this.firebaseService.addDocument(HYMNALS.COLLECTION, hymnal);
            return HYMNALS.CREATE;
        } catch (error) {
            return error.message;
        }
    }

    public async updateHimno(hymnal: HymnalI) {
        try {
            await this.firebaseService.updateDocument(HYMNALS.COLLECTION, hymnal);
            return HYMNALS.UPDATE;
        } catch (error) {
            return error.message;
        }
    }
}
