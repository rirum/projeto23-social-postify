import { Publication } from '@prisma/client';
import { CreatePublicationDto } from '../dto/publication.dto';

export abstract class PublicationRepository {
    abstract createPublication(data: CreatePublicationDto, userId: number): Promise<Publication>;
    abstract getPublications(id: number);
    abstract findPublicationByTitle(title: string): Promise<Publication>;
    abstract findPublicationById(id: number): Promise<Publication>;
}
