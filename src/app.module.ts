import { SongsModule } from './presentation/songs/songs.module';
import { HymnalSongModule } from './presentation/hymnals-songs/hymnal-song.module';
import { HymnalModule } from './presentation/hymnals/hymnal.module';
import { UserModule } from './presentation/user/user.module';
import { configurationEnv } from '@infrastructure/config/configuration';
import { SharedModule } from '@infrastructure/module/shared.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@presentation/auth/auth.module';

@Module({
  imports: [
    SongsModule,
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurationEnv],
    }),
    AuthModule,
    UserModule,
    HymnalModule,
    HymnalSongModule,

  ],
})
export class AppModule { }
