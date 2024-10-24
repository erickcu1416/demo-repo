import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { SharedModule } from '@infrastructure/module/shared.module';
import { AuthService } from '@application/services/auth.service';
import { UserRegisterUseCase } from '@application/use-cases/auth/user-register.use-case';
import { UserReserPasswordUseCase } from '@application/use-cases/auth/user-reset-password.use-case';
@Module({
    imports: [SharedModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        UserRegisterUseCase,
        UserReserPasswordUseCase
    ],
})
export class AuthModule { }
