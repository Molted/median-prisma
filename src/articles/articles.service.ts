import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { ConnectionArgsDto } from 'src/page/connection-args.dto';
import { ArticleEntity } from './entities/article.entity';
import { PageEntity } from 'src/page/page.entity';

@Injectable()
export class ArticlesService {
  constructor(private readonly database: DatabaseService) {}

  async create(createArticleDto: Prisma.ArticleCreateInput) {
    return this.database.article.create({
      data: createArticleDto
    })
  }

  async findAll() {
    return this.database.article.findMany({ where: { published: true } });
  }

  async findDrafts() {
    return this.database.article.findMany({ where: { published: false } });
  }

  async findPage(connectionArgs: ConnectionArgsDto) {
    const where: Prisma.ArticleWhereInput = { published: true };
    const page = await findManyCursorConnection(
      // 👇 args contain take, skip and cursor
      async (args) => {
        const { take, skip, cursor } = args;
        const findManyArgs: Prisma.ArticleFindManyArgs = {
          take,
          skip,
          ...(cursor ? { cursor: { id: parseInt(cursor.id, 10) } } : {}), // Convert id to number if cursor is defined
          // where,
          include: {
            author: true
          }
        };
  
        return await this.database.article.findMany(findManyArgs);
      },
      () => this.database.article.count({ /* where */ }),
      connectionArgs,
      {
        recordToEdge: (record) => ({
          node: new ArticleEntity(record),
        })
      }
     );

     return new PageEntity<ArticleEntity>(page);
  }

  async findOne(id: number) {
    return this.database.article.findUnique({
      where: { id },
      include: {
        author: true
      }
    });
  }

  async update(id: number, updateArticleDto: Prisma.ArticleUpdateInput) {
    return this.database.article.update({
      where: { id },
      data: updateArticleDto
    })
  }

  async remove(id: number) {
    return this.database.article.delete({ where: { id } });
  }
}
