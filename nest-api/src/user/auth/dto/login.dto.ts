import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    default: 'joe@email.com',
  })
  @IsEmail()
  email: string;

  @IsString()
  @ApiProperty({
    default: '123456',
  })
  password: string;
}
