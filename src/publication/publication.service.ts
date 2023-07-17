import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreatePublicationDto } from './dto/publication.dto';
import { PublicationRepository } from './repository/publication.repository';


@Injectable()
export class PublicationService {
constructor(private readonly publicationRepository: PublicationRepository){}

    async createPublication(body:CreatePublicationDto, userId: number){
        const publication = await this.publicationRepository.findPublicationByTitle(body.title)
        if (publication && publication.userId === userId) throw new HttpException('There is already a publication', HttpStatus.CONFLICT);
        return this,this.publicationRepository.createPublication(body, userId)
        
    }

    async getAllPublications(userId:number) {
        const publications = await this.publicationRepository.getPublications(userId);
        return publications;
    }
}
