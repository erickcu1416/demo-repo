import { MESSAGESAUTH, MESSAGESUSERS } from '@domain/constants/auth';
import { UserAuthI } from '@domain/interface/auth/user-auth.interface';
import { UserLoginI } from '@domain/interface/auth/user-logininterface';
import { IGenericResponse } from '@domain/response/IGenericResponse.interface';
import { FirebaseService } from '@infrastructure/service/firebase.service';
import { MailService } from '@infrastructure/service/mail.service';
import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AuthService {
    
    constructor(
        private readonly firebaseService: FirebaseService,
        private readonly mailService: MailService
    ) {}

    public async register(user: UserAuthI) {
        try {
            const authUser = await this.firebaseService.authCreateUser(user);
            //Send email with link to verify email
            const emailVerificationLink = await this.firebaseService.generateEmailVerificationLink(user.email);
            await this.mailService.sendMail({
                to: user.email,
                message: {
                    subject: MESSAGESAUTH.VERIFYEMAIL,
                    html: `<a href="${emailVerificationLink}">Haz click aquí para verificar tu correo electrónico</a>`
                }
            });

            user.id = authUser.uid;
            delete user.password;
            delete user.displayName
            await this.firebaseService.addDocumentWithID('users', user);
            return MESSAGESUSERS.REGISTER;
        } catch (error) {
            console.error(MESSAGESAUTH.ERRORREGISTER, error); 
            return error.message;
        }
    }

    public async resetPassword(email: string) {
        try {
            const result = await this.firebaseService.recoverPasswordResetLink(email);
            await this.mailService.sendMail({
                to: email,
                message: {
                    subject: MESSAGESAUTH.RESSETPASSWORD,
                    html: `<a href="${result}">Haz click aquí para restablecer tu contraseña</a>`
                }
            });
            //Send email with link to reset password
            return result;
        } catch (error) {
            console.error(MESSAGESAUTH.ERRORRESETPASSWORD, error);
            return error.message;
        }
    }
    
}
