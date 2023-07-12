import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UsersRepository } from './user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UsersRepository],
})
export class UserModule {}
