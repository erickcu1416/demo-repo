import { AuthService } from '@application/services/auth.service';
import { UserAuthI } from '@domain/interface/auth/user-auth.interface';
import { IGenericResponse } from '@domain/response/IGenericResponse.interface';
import { ExceptionsService } from '@infrastructure/exceptions/exceptions.service';
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class UserRegisterUseCase {
  constructor(
    private readonly _auth: AuthService,
    private readonly exceptionService: ExceptionsService,
  ) {}

  @HttpCode(HttpStatus.ACCEPTED)
  async execute(body: UserAuthI): Promise<IGenericResponse> {
    try {
      const user_create = await this._auth.register(body);
      if (user_create?.ok) {
        const response: IGenericResponse = {
          ok: true,
          payload: user_create,
          message: 'Usuario creado con éxito',
        };
        return response;
      } else {
        this.exceptionService.badRequestException(user_create);
      }
    } catch (error) {
      throw new HttpException(error?.response, HttpStatus.BAD_REQUEST);
    }
  }
}
