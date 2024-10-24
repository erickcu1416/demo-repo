import { USERS } from '@domain/constants/user';
import { UserUpdateI } from '@domain/interface/user/user-auth-update.interface';
import { FirebaseService } from '@infrastructure/service/firebase.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

    constructor(
        private readonly firebaseService: FirebaseService
    ) { }

    public async updateUser(user: UserUpdateI) {
        try {
            await this.firebaseService.updateDocument(USERS.COLLECTION, user);
            const displayName = `${user.name} ${user.last_name}`;
            await this.firebaseService.authUpdateUserDisplayName(user.id, displayName)
            return USERS.UPDATE;
        } catch (error) {
            console.error(USERS.ERRORUPDATE, error);
            return error.message;
        }
    }
}
