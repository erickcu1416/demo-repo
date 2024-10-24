import { HymnalsService } from '@application/services/hymnals.service';
import { HymnalI } from '@domain/interface/hymnals/hymnal.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class HymnalUpdateUseCase {
    constructor(private readonly _hymnal: HymnalsService) { }

    async execute(body: HymnalI): Promise<HttpException> {
        try {
            const user_create = await this._hymnal.updateHimno(body);
            return new HttpException(user_create, HttpStatus.ACCEPTED)
        } catch (error) {
            console.log("errors", error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST,
            );
        }
    }
}
