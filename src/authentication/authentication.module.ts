import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersRepository } from 'src/user/repository/user.repository';
import { PrismaUser } from 'src/user/repository/implementation/prismaUser.repository';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';

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
    {
      provide: UsersRepository,
      useClass: PrismaUser,
    },
  ],
})
export class AuthenticationModule {}
