import { Body, Controller, Post, Response } from '@nestjs/common';
import { UserService } from '../user.service';
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { ErrorResponseDto } from '../../common/dto/error-response.dto';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @ApiResponse({
    type: LoginResponseDto,
  })
  login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('login/cookie')
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
    res.cookie('SESSIONID', token.accessToken, { httpOnly: true }); // Set JWT token as a session cookie
    return res.send();
  }

  @ApiCookieAuth()
  @Post('logout/cookie')
  async logout(@Response() res) {
    res.clearCookie('SESSIONID'); // Clear the session cookie
    return res.send();
  }
}
