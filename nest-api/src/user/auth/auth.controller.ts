import { Body, Controller, Post, Response, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { ErrorResponseDto } from '../../common/dto/error-response.dto';
import { AuthCookieGuard } from '../../guards/auth-cookie/auth-cookie.guard';
import { AuthUser } from './decorators/auth-user.decorator';
import { SESSIONID } from '../../common/constants';
import { IAuthUser } from './interfaces/auth-user.interface';

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
    res.cookie(SESSIONID, token.accessToken, { httpOnly: true }); // Set JWT token as a session cookie
    return res.send({ accessToken: token.accessToken } as LoginResponseDto);
  }

  @UseGuards(AuthCookieGuard)
  @ApiCookieAuth()
  @Post('logout')
  async logout(@Response() res, @AuthUser() authUser: IAuthUser) {
    this.authService.logout(authUser.sub);
    res.clearCookie(SESSIONID); // Clear the session cookie
    return res.send();
  }
}
