import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ description: 'User previous password', format: 'password' })
  @IsString()
  oldPassword: string;

  @ApiProperty({ description: 'User new password', format: 'password', minLength: 8, maxLength: 30 })
  @Length(8, 30)
  @IsString()
  newPassword: string;
}
