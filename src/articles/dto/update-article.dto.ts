import { PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';
import { Prisma } from '@prisma/client';

export class UpdateArticleDto
  extends PartialType(CreateArticleDto)
  implements Prisma.ArticleUpdateInput {}
