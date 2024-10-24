import { HymnalsService } from '@application/services/hymnals.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class HymnalAllUseCase {
    constructor(private readonly _hymnal: HymnalsService) {}

    async execute(): Promise<HttpException> {
        try {
            const user_create = await this._hymnal.getAll();
            return new HttpException(user_create, HttpStatus.ACCEPTED)
        } catch (error) {
            console.log("errors", error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST,
            );
        }
    }
 }
