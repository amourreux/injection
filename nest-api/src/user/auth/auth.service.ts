import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { IAuthUser } from './interfaces/auth-user.interface';
import { JWT_SECRET_KEY } from '../../common/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private configService: ConfigService,
  ) {}

  async logout(id: string) {
    const user = await this.userModel.findById(id).exec();
    user.accessHash = null;
    await user.save();
  }

  async login({ email, password }: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userModel.findOne({ email }).select('+password');

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const accessToken = await jwt.sign(
      { sub: user._id, email, roles: {} },
      this.configService.get<string>(JWT_SECRET_KEY),
    );

    user.accessHash = await bcrypt.hash(accessToken, 10);
    await user.save();

    return { accessToken } as LoginResponseDto;
  }

  async verifyToken(token: string): Promise<IAuthUser> {
    try {
      const decoded = jwt.verify(
        token,
        this.configService.get<string>(JWT_SECRET_KEY),
      ) as IAuthUser;

      const { email } = decoded;
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new UnauthorizedException();
      }

      const isMatch = await bcrypt.compare(token, user.accessHash);

      if (!isMatch) {
        throw new UnauthorizedException();
      }

      return decoded;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
