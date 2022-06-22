import { ApiProperty } from '@nestjs/swagger';

export class ToknesDto {
  @ApiProperty({ description: 'Access token' })
  accessToken: string;

  @ApiProperty({ description: 'Refresh token' })
  refreshToken: string;
}
