import { ApiProperty } from '@nestjs/swagger';

export class UpdateAvatarDto {
  @ApiProperty({
    description: 'User avatar in JPG/JPEG/PNG format (max 5MB)',
    type: 'string',
    format: 'binary',
  })
  avatar: string;
}
