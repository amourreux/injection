import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { IAuthUser } from '../interfaces/auth-user.interface';

export const AuthUser = createParamDecorator(
  (_, ctx: ExecutionContext): IAuthUser => {
    const request = ctx.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;
    const token = authHeader.slice(7);
    const decoded = jwt.decode(token);

    return decoded as IAuthUser;
  },
);
