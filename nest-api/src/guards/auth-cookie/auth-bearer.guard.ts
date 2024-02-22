import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../../user/auth/auth.service';

@Injectable()
export class AuthBearerGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    // get header bear token
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }
    const token = authHeader.slice(7); // Remove 'Bearer ' from the token

    // stage one check if saved on db that you can only use in single place
    try {
      await this.authService.verifyToken(token);
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
