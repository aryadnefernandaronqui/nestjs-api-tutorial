import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { ShelvesModule } from './shelves/shelves.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BookmarkModule,
    ShelvesModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
