import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ description: 'User e-mail', format: 'email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', format: 'password' })
  @IsString()
  password: string;
}
