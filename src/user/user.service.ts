import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './repository/user.repository';
import { SigninDto } from './dto/signin-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(user: CreateUserDto):Promise<User>{
    const userExists = await this.userRepository.findUserByEmail(user.email);
    if (userExists)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);

    const hashPassword = bcrypt.hashSync(user.password, 10);
    const userCreated = await this.userRepository.addUser({
      ...user,
      password: hashPassword,
    });
    console.log(userCreated)
    return userCreated
    // return {
    //   id: userCreated.id,
    //   name: userCreated.name,
    //   email: userCreated.email,
    //   avatar: userCreated.avatar,
    //   createdAt: userCreated.createdAt,
    // }
  }

  async findByEmail(email: string):Promise<User> {
    return await this.userRepository.findUserByEmail(email);
  }

  async findUserById(id: number):Promise<User> {
    const user = await this.userRepository.findUserById(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }


}
