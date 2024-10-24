import { AuthService } from '@application/services/auth.service';
import { UserAuthI } from '@domain/interface/auth/user-auth.interface';
import { UserResetPasswordI } from '@domain/interface/auth/user-reset-password.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UserReserPasswordUseCase {
    constructor(private readonly _auth: AuthService) {
    }
    async execute(body: UserResetPasswordI): Promise<HttpException> {
        try {
            const user_create = await this._auth.resetPassword(body.email);
            return new HttpException(user_create, HttpStatus.ACCEPTED)
        } catch (error) {
            console.log("errors", error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST,
            );
        }
    }

}
