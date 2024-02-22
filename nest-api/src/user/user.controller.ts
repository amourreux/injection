import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUser } from './auth/decorators/auth-user.decorator';
import { IAuthUser } from './auth/interfaces/auth-user.interface';
import { AuthBearerGuard } from '../guards/auth-cookie/auth-bearer.guard';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AuthBearerGuard)
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
