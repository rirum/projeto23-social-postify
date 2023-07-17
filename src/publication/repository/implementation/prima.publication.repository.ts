import { Injectable } from '@nestjs/common';
import { PublicationRepository } from '../publication.repository';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePublicationDto } from 'src/publication/dto/publication.dto';
import { GetResult } from '@prisma/client/runtime';

@Injectable()
export class PrismaPublicationRepository implements PublicationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createPublication(data: CreatePublicationDto, userId: number) {
    return await this.prisma.publication.create({
      data: data,
    });
  }

  async getPublications(id: number) {
    return await this.prisma.publication.findMany({ where: { userId: id } });
  }

  async findPublicationByTitle(title: string) {
    return await this.prisma.publication.findFirst({ where: { title } });
  }

  async findPublicationById(id: number) {
    return await this.prisma.publication.findUnique({ where: { id } });
  }
}
