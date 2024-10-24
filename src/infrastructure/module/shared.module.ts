import { FirebaseConfigService } from "@infrastructure/config/firebase.config";
import { ExceptionsService } from "@infrastructure/exceptions/exceptions.service";
import { FirebaseService } from "@infrastructure/service/firebase.service";
import { MailService } from "@infrastructure/service/mail.service";
import { Module } from "@nestjs/common";

@Module({
  controllers: [],
  providers: [
    FirebaseService,
    FirebaseConfigService,
    MailService,
    ExceptionsService
  ],
  exports: [
    FirebaseService,
    FirebaseConfigService,
    MailService,
    ExceptionsService
  ],
})
export class SharedModule {}
