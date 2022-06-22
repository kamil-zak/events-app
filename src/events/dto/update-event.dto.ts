import { PartialType } from '@nestjs/mapped-types';
import { EventDetailsDto } from './event-details.dto';

export class UpdateEventDto extends PartialType(EventDetailsDto) {}
