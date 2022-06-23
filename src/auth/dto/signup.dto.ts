import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ description: 'User e-mail', format: 'email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password (8-30 characters)', format: 'password', minLength: 8, maxLength: 30 })
  @Length(8, 30)
  @IsString()
  password: string;

  @ApiProperty({
    description: 'User avatar in JPG/JPEG/PNG format (max 5MB)',
    required: false,
    type: 'string',
    format: 'binary',
  })
  avatar: string;
}
