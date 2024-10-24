import { UserRegisterUseCase } from '@application/use-cases/auth/user-register.use-case';
import { UserReserPasswordUseCase } from '@application/use-cases/auth/user-reset-password.use-case';
import { RegisterDto } from '@domain/dto/auth/register.dto';
import { ResetPassordDto } from '@domain/dto/auth/reset-password.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller("auth")
export class AuthController {

    constructor(
        private readonly UserRegisterUseCase: UserRegisterUseCase,
        private readonly UserReserPasswordUseCase: UserReserPasswordUseCase,
    ) { }

    @Post('register')
    register(
        @Body() register: RegisterDto
    ) {
        return this.UserRegisterUseCase.execute(register);
    }

    @Post('reset-password')
    resetPassword(
        @Body() register: ResetPassordDto
    ) {
        return this.UserReserPasswordUseCase.execute(register);
    }
}
