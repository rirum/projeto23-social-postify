import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthSigninDto } from './dto/auth-signin.dto';
import { AuthSignupDto } from './dto/auth-signup.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from 'src/user/repository/user.repository';
import { User } from '@prisma/client';

@Injectable()
export class AuthenticationService {
  private AUDIENCE = 'users';
  private ISSUER = 'admin';
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  createToken(user: User) {
    const token = this.jwtService.sign(
      {
        name: user.name,
        email: user.email,
      },
      {
        expiresIn: '3 days',
        subject: String(user.id),
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
      },
    );

    return { token };
  }

  checkToken(token: string) {
    try {
      console.log(token);
      const data = this.jwtService.verify(token, {
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
  async signup(body: AuthSignupDto) {
    const user = await this.userService.create(body);
    return this.createToken(user);
  }

  async signin({ email, password }: AuthSigninDto) {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) throw new UnauthorizedException('Email or password invalid');

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword)
      throw new UnauthorizedException('Email or password invalid');
    return this.createToken(user);
  }
}
