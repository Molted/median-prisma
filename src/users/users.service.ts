import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private readonly database: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    )
    createUserDto.password = hashedPassword;

    return await this.database.user.create({ data: createUserDto });
  }

  findAll() {
    return this.database.user.findMany();
  }

  findOne(id: number) {
    return this.database.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.database.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: number) {
    return this.database.user.delete({ where: { id } });
  }
}
