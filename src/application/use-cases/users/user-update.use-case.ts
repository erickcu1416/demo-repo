import { UserService } from '@application/services/user.service';
import { UserUpdateI } from '@domain/interface/user/user-auth-update.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UserUpdateUseCase {
    constructor(private readonly _user: UserService) {
    }
    async execute(body: UserUpdateI): Promise<HttpException> {
        try {
            const user_create = await this._user.updateUser(body);
            return new HttpException(user_create, HttpStatus.ACCEPTED)
        } catch (error) {
            console.log("errors", error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST,
            );
        }
    }

}
