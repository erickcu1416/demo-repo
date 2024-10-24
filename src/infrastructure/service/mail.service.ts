import { Injectable } from "@nestjs/common";
import { FirebaseService } from "./firebase.service";
import { Email } from "@domain/interface/mail/mail.interface";

@Injectable()
export class MailService {

    constructor(
        private readonly _firebase: FirebaseService
    ) { }

    public async sendMail(mail:Email) {
        try {
            const email = await this._firebase.addDocument("mail",{
                to: mail.to,
                message: {
                  subject: mail.message.subject,
                  html: mail.message.html,
                }
              }
              )
            return "Mail sent successfully";
        } catch (error) {
            console.error('Error sending mail:', error);
            return error.message;
        }
    }
}