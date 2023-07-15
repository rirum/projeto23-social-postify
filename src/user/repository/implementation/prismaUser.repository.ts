import { UsersRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PrismaUser implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}
  async addUser(data: CreateUserDto) {
    return await this.prisma.user.create({ data: data });
  }
  async findAll() {
    return await this.prisma.user.findMany({});
  }
  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findUserById(id: number) {
    return await this.prisma.user.findFirst({ where: { id } });
  }
}
