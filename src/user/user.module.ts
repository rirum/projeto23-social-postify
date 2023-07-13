import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UsersRepository } from './repository/user.repository';
import { PrismaUser } from './repository/implementation/prismaUser.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: UsersRepository,
      useClass: PrismaUser,
    },
  ],
  exports: [
    UserService,
    {
      provide: UsersRepository,
      useClass: PrismaUser,
    },
  ],
})
export class UserModule {}
