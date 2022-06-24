import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'User id', type: Number })
  id: number;

  @ApiProperty({ description: 'User email', format: 'email' })
  email: string;
}
