import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Prisma } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) implements Prisma.UserUpdateInput {}
