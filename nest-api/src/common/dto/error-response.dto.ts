import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ default: 'Not found' })
  message: string;
  @ApiProperty({
    default: 404,
  })
  statusCode: number;
}
