import { ApiProperty } from '@nestjs/swagger';

export class ToknesDto {
  @ApiProperty({ description: 'Access token (expires in 5 minutes)' })
  accessToken: string;

  @ApiProperty({ description: 'Refresh token' })
  refreshToken: string;
}
