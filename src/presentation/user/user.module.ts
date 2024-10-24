import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { SharedModule } from '@infrastructure/module/shared.module';
import { UserService } from '@application/services/user.service';
import { UserUpdateUseCase } from '@application/use-cases/users/user-update.use-case';

@Module({
    imports: [SharedModule],
    controllers: [UserController],
    providers: [
        UserService,
        UserUpdateUseCase
    ],
})
export class UserModule { }
