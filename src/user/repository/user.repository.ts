import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';

export abstract class UsersRepository {
  abstract addUser(user: CreateUserDto): Promise<User>;
  abstract findUserByEmail(email: string): Promise<User>;
  // abstract findUserById(id: number): Promise<User>;
}
