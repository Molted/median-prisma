import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, ArticlesModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
