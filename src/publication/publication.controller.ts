import { Body, Post, Controller, UseGuards, Get } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { AuthGuard } from 'src/authentication/authGuard/auth.guard';
import { CreatePublicationDto } from './dto/publication.dto';
import { userRequest } from 'src/authentication/decorators/user-decorators';
import { User } from '@prisma/client';


@Controller('publication')
export class PublicationController {


  constructor(private readonly publicationService: PublicationService) {}

  @UseGuards(AuthGuard)
  @Post()
  createPublication(@Body() body: CreatePublicationDto, @userRequest() user: User) {
    console.log("dentro do post")
    const userId = user.id;
    return this.publicationService.createPublication(body, userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  getUserPublications(@userRequest() user: User) {
   console.log("dentro do get")
    const userId = user.id;
    return this.publicationService.getAllPublications(userId);
  }
}
