import { Module } from '@nestjs/common';
import { UserModule } from './infra/http/module/user/user.module';
import { DatabaseModule } from './infra/database/database.module';
import { AuthModule } from './infra/http/module/auth/auth.module';
import { JwtAuthGuard } from './infra/http/module/auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { NoteModule } from './infra/http/module/note/note.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    NoteModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule {}
