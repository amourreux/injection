import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { IAuthUser } from '../interfaces/auth-user.interface';
import { SESSIONID } from '../../../common/constants';

export const AuthUser = createParamDecorator(
  (_, ctx: ExecutionContext): IAuthUser => {
    const request = ctx.switchToHttp().getRequest();
    const sessionCookie = request.cookies[SESSIONID];
    const decoded = jwt.decode(sessionCookie);
    return decoded as IAuthUser;
  },
);
