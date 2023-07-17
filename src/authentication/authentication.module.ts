import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersRepository } from 'src/user/repository/user.repository';
import { PrismaUser } from 'src/user/repository/implementation/prismaUser.repository';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { PublicationService } from 'src/publication/publication.service';
import { PrismaPublicationRepository } from 'src/publication/repository/implementation/prima.publication.repository';
import { PublicationRepository } from 'src/publication/repository/publication.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    UserService,
    PublicationService,
    {
      provide: UsersRepository,
      useClass: PrismaUser,
    },
    {
      provide: PublicationRepository,
      useClass: PrismaPublicationRepository,
    },
  ],
})
export class AuthenticationModule {}
