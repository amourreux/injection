import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../../user/auth/auth.service';

@Injectable()
export class AuthCookieGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const sessionCookie = request.cookies['SESSIONID'];

    // stage one check if saved on db that you can only use in single place
    try {
      await this.authService.verifyToken(sessionCookie);
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
