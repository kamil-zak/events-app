import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { PER_PAGE_DEFAULT } from '../contants/pagination.constants';

export class EventFindAllQueryDto {
  @ApiProperty({
    name: 'limit',
    description: 'Count of items per page.',
    required: false,
    default: PER_PAGE_DEFAULT,
  })
  @Transform(({ value }) => value && parseInt(value))
  @IsInt()
  @IsOptional()
  page?: number;

  @ApiProperty({ name: 'page', description: 'Page of results to return.', required: false, default: 1 })
  @Transform(({ value }) => value && parseInt(value))
  @IsInt()
  @IsOptional()
  limit?: number;

  @ApiProperty({ name: 'userId', description: 'Filter events by user id.', required: false })
  @Transform(({ value }) => value && parseInt(value))
  @IsInt()
  @IsOptional()
  userId?: number;
}
