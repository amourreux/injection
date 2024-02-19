import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    default: 'joe@email.com',
  })
  email: string;

  @ApiProperty({
    default: '123456',
  })
  password: string;
}
