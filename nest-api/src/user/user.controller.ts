import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { AuthCookieGuard } from '../guards/auth-cookie/auth-cookie.guard';
import { AuthUser } from './auth/decorators/auth-user.decorator';
import { IAuthUser } from './auth/interfaces/auth-user.interface';

@Controller('user')
@ApiTags('User')
@ApiCookieAuth()
@UseGuards(AuthCookieGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@AuthUser() authUser: IAuthUser) {
    console.log(authUser);
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
