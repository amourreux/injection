import { Body, Controller, Post, Response, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { ErrorResponseDto } from '../../common/dto/error-response.dto';
import { AuthUser } from './decorators/auth-user.decorator';
import { IAuthUser } from './interfaces/auth-user.interface';
import { AuthBearerGuard } from '../../guards/auth-cookie/auth-bearer.guard';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'User authenticated and session cookie set',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorResponseDto,
  })
  async loginWithSessionCookie(@Body() loginDto: LoginDto, @Response() res) {
    const token = await this.authService.login(loginDto);
    return res.send({ accessToken: token.accessToken } as LoginResponseDto);
  }

  @UseGuards(AuthBearerGuard)
  @ApiBearerAuth()
  @Post('logout')
  async logout(@Response() res, @AuthUser() authUser: IAuthUser) {
    this.authService.logout(authUser.sub);
    return res.send();
  }
}
