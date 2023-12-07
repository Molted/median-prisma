import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

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

  async findOne(id: number) {
    return this.database.article.findUnique({ where: { id } });
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
