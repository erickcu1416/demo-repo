import { HymnalAllUseCase } from '@application/use-cases/hymnals/hymnals-all.use-case';
import { HymnalCreateUseCase } from '@application/use-cases/hymnals/hymnals-create.use-case';
import { HymnalUpdateUseCase } from '@application/use-cases/hymnals/hymnals-update.use-case';
import { HymnalCreateDto } from '@domain/dto/hymnals/hymnal-create.dto';
import { HymnalUpdateDto } from '@domain/dto/hymnals/hymnal-updatedto';
import { Body, Controller, Get, Patch, Post } from '@nestjs/common';

@Controller("hymnal")
export class HymnalController {

    constructor(
        private readonly HymnalAllUseCase: HymnalAllUseCase,
        private readonly HymnalCreateUseCase: HymnalCreateUseCase,
        private readonly HymnalUpdateUseCase: HymnalUpdateUseCase,
    ) { }

    @Post('create')
    create(
        @Body() register: HymnalCreateDto
    ) {
        return this.HymnalCreateUseCase.execute(register);
    }

    @Get('all')
    all() {
        return this.HymnalAllUseCase.execute();
    }

    @Patch('update')
    update(
        @Body() register: HymnalUpdateDto
    ) {
        return this.HymnalUpdateUseCase.execute(register);
    }
}
