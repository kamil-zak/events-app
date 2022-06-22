import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserDto {
  @ApiProperty({ description: 'User id' })
  id: number;

  @ApiProperty({ description: 'User email', format: 'email' })
  email: string;
}
