import { UserUpdateUseCase } from '@application/use-cases/users/user-update.use-case';
import { UserUpdateDto } from '@domain/dto/user/user-update.dto';
import { Body, Controller, Patch } from '@nestjs/common';

@Controller("user")
export class UserController {

    constructor(
        private readonly UserUpdateUseCase: UserUpdateUseCase
    ) { }

    @Patch('update')
    update(
        @Body() update: UserUpdateDto
    ) {
        return this.UserUpdateUseCase.execute(update);
    }
}
