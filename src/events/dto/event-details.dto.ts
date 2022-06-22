import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString, Length } from 'class-validator';

const datePattern = '([0-9]{4})-(?:[0-9]{2})-([0-9]{2})';

export class EventDetailsDto {
  @ApiProperty({ description: 'Name of the event', minLength: 3, maxLength: 30, example: 'Programming meeting' })
  @Length(3, 30)
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Event start date',
    type: 'date',
    example: '2022-05-21',
    pattern: datePattern,
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'Event end date',
    type: 'date',
    example: '2022-05-25',
    pattern: datePattern,
  })
  @IsDateString()
  endDate: string;
}
