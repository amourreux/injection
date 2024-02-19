import { Controller, Post } from '@nestjs/common';
import { UserService } from '../user.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  login() {
    return 'login';
  }

  @Post('logout')
  logout() {
    return 'logout';
  }

  @Post('register')
  register() {
    return 'register';
  }

  @Post('forgot')
  forgot() {
    return 'forgot';
  }

  @Post('info')
  info() {
    return 'login';
  }
}
