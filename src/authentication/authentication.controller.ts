import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthSigninDto } from './dto/auth-signin.dto';
import { AuthGuard } from './authGuard/auth.guard';
import { AuthSignupDto } from './dto/auth-signup.dto';
import { userRequest } from './decorators/user-decorators';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @HttpCode(200)
  @Post('signin')
  async signin(@Body() body: AuthSigninDto) {
    console.log("dentro do signin")
    return this.authenticationService.signin(body);
  }

  @Post('signup')
  async signup(@Body() body: AuthSignupDto) {
    return this.authenticationService.signup(body);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async userLogged(@userRequest() user: User) {
    console.log("dentro do me")
    return user;
  }
}
