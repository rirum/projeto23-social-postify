import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from '../authentication.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.header;

    try {
      console.log(request)
      const token = authorization?.split(' ')[1];
      const data = this.authService.checkToken(token);
      
      const user = await this.userService.findUserById(Number(data.sub));

      request.user = user;
    } catch (err) {
      console.log(err);
     return false;
    }
    return true;
  }
}
