import { ApiProperty } from '@nestjs/swagger';
import { EventDetailsDto } from './event-details.dto';

export class EventDto extends EventDetailsDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ description: 'Id of owner user.' })
  userId: number;
}
