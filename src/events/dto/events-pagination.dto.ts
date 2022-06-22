import { ApiProperty } from '@nestjs/swagger';
import { EventDto } from './event.dto';

export class EventPaginationDto {
  @ApiProperty({ description: 'Current page number.' })
  currentPage: number;

  @ApiProperty({ description: 'Count of  all available pages.' })
  pagesCount: number;

  @ApiProperty({ type: [EventDto] })
  events: EventDto[];
}
