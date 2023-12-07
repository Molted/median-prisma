import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [DatabaseModule, ArticlesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
