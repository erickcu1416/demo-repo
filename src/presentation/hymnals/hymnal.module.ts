import { SharedModule } from '@infrastructure/module/shared.module';
import { HymnalController } from './hymnal.controller';
import { Module } from '@nestjs/common';
import { HymnalUpdateUseCase } from '@application/use-cases/hymnals/hymnals-update.use-case';
import { HymnalCreateUseCase } from '@application/use-cases/hymnals/hymnals-create.use-case';
import { HymnalAllUseCase } from '@application/use-cases/hymnals/hymnals-all.use-case';
import { HymnalsService } from '@application/services/hymnals.service';

@Module({
    imports: [SharedModule],
    controllers: [
        HymnalController
    ],
    providers: [
        HymnalsService,
        HymnalAllUseCase,
        HymnalCreateUseCase,
        HymnalUpdateUseCase
    ],
})
export class HymnalModule { }
