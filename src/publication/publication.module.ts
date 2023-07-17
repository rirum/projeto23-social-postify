import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { UserService } from 'src/user/user.service';
import { PublicationRepository } from './repository/publication.repository';
import { PrismaPublicationRepository } from './repository/implementation/prima.publication.repository';
import { UsersRepository } from 'src/user/repository/user.repository';
import { PrismaUser } from 'src/user/repository/implementation/prismaUser.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [PublicationController],
  providers: [
    UserService,
    {
      provide: UsersRepository,
      useClass: PrismaUser,
    },
    AuthenticationService,
    PublicationService,

    {
      provide: PublicationRepository,
      useClass: PrismaPublicationRepository,
    },
  ],
  exports: [
    PublicationService,
    {
      provide: PublicationRepository,
      useClass: PrismaPublicationRepository,
    },
  ],
})
export class PublicationModule {}
