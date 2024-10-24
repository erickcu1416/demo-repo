import { Query } from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';
import { FirebaseConfigService } from '../config/firebase.config';
import { generateSecurePassword } from '@application/utils/user.utils';
import { from, map, Observable } from 'rxjs';
import { UserAuthI } from '@domain/interface/auth/user-auth.interface';
import { ExceptionsService } from '@infrastructure/exceptions/exceptions.service';
import { getStatusErrorWithOutPrefix } from '@infrastructure/common/mappers/firebase-error.mapper';

@Injectable()
export class FirebaseService {
    private isFirstSnapshot = true;

    constructor(private readonly firebaseConfigService: FirebaseConfigService, private readonly exceptionService: ExceptionsService,) {
        /*  this.detectNewUser(); */
    }


    async authCreateUser(user: UserAuthI) {
        try {
            user.emailVerified = false;
            user.displayName = `${user.name} ${user.last_name}`;
            const userRecord = await this.firebaseConfigService.getDataAuth().createUser(user)
            return userRecord;
        } catch (error) {
            const newErrorMapper = getStatusErrorWithOutPrefix(error?.errorInfo?.code);
            this.exceptionService.badRequestException(newErrorMapper);
        }
    }

    async authUpdateUserDisplayName(uid: string, displayName: string) {
        try {
            await this.firebaseConfigService.getDataAuth().updateUser(uid, { displayName });
        } catch (error) {
            this.exceptionService.badRequestException({
                message: 'Error updating user password',
                code_error: error.message,
            });
        }
    }

    async generateEmailVerificationLink(email: string) {
        try {
            const link = await this.firebaseConfigService.getDataAuth().generateEmailVerificationLink(email);
            return link;
        } catch (error) {
            throw new Error(`Error generating email verification link: ${error.message}`);
        }
    }

    async recoverPasswordResetLink(email: string) {
        try {
            const link = await this.firebaseConfigService.getDataAuth().generatePasswordResetLink(email);
            return link;
        } catch (error) {
            throw new Error(`Error sending password reset email: ${error.message}`);
        }
    }

    async authUpdateUser(user: UserAuthI) {
        try {
            const userRecord = await this.firebaseConfigService.getDataAuth().updateUser(user.id, user);
            return userRecord;
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    async authDeleteUser(uid: string) {
        try {
            await this.firebaseConfigService.getDataAuth().deleteUser(uid);
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }

    public addDocument(collection: string, data: any): Promise<any> {
        const dataWith = {
            ...data,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
            is_deleted: false,
        }
        return this.firebaseConfigService.getFirestore().collection(collection).add(dataWith);
    }


    public addDocumentWithID(collection: string, data: any): Promise<any> {
        const dataWith = {
            ...data,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
            is_deleted: false,
        }
        return this.firebaseConfigService.getFirestore().collection(collection).doc(data.id).set(dataWith);
    }

    public updateDocument(collection: string, data: any): Promise<any> {
        const dataWith = {
            ...data,
            updatedAt: new Date().getTime(),
        }
        return this.firebaseConfigService.getFirestore().collection(collection).doc(data.id).update(dataWith);
    }

    public deleteDocument(collection: string, id: string): Promise<any> {
        return this.firebaseConfigService.getFirestore().collection(collection).doc(id).delete();
    }

    public async getCollection(collection: string, id: string): Promise<any> {
        let doc = await this.firebaseConfigService.getFirestore().collection(collection).doc(id).get();
        if (!doc.exists) {
            throw new Error('No se encontró elemento');
        }
        return {
            ...doc.data(),
            id: doc.id,
        };
    }

    public getDocuments(collection: string): Observable<{ id: string; data: any }[]> {
        const firestore = this.firebaseConfigService.getFirestore();
        const collec = firestore.collection(collection);
        const documentsObservable = from(collec.get()).pipe(
            map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })))
        );
        return documentsObservable;
    }

    public async getDocumentFilters(collection: string, query: QueryParams): Promise<any[]> {
        try {
            const firestore = this.firebaseConfigService.getFirestore();
            let ref: Query = firestore.collection(collection);

            if (query.filters) {
                ref = this.applyFilters(ref, query.filters);
            }

            if (query.sort) {
                ref = this.applySortAndLimit(ref, query.sort);
            }

            const res = await ref.get();
            if (res.empty) {
                return [];
            }

            return res.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }));
        } catch (error) {
            console.error('Error getting documents: ', error);
            throw new Error('Error getting documents');
        }
    }
    private async detectNewUser() {
        const firestore = this.firebaseConfigService.getFirestore();
        firestore.collection('users').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(async change => {
                if (this.isFirstSnapshot) {
                    return;
                }
                if (change.type === 'added') {
                    console.log('Nuevo usuario detectado:', change.doc.data());
                    const user: any = change.doc.data();
                    if (!user.password) {
                        console.log("Sin password");
                        user.password = await generateSecurePassword();
                        await this.authUpdateUser(user);
                        await this.updateDocument('users', user);
                    }
                }
            });
            this.isFirstSnapshot = false;
        });
    }

    private applyFilters(ref: Query, filters: Filter[]): Query {
        filters.forEach((filter) => {
            ref = ref.where(filter.attr, filter.operation, filter.value);
        });
        return ref;
    }

    private applySortAndLimit(ref: Query, sort: Sort): Query {
        ref = ref.orderBy(sort.attr, sort.asc ? 'asc' : 'desc');
        if (sort.limit && sort.limit > 0) {
            ref = ref.limit(sort.limit);
        }
        return ref;
    }


}
