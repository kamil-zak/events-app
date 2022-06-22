import { PartialType } from '@nestjs/swagger';
import { EventDetailsDto } from './event-details.dto';

export class EventPartialDetailsDto extends PartialType(EventDetailsDto) {}
