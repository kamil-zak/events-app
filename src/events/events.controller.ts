import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import UserId from 'src/common/decorators/user-id.decorator';
import ProtectedRoute from 'src/common/decorators/protected-route.decorator';
import { EventDetailsDto } from './dto/event-details.dto';
import { EventsService } from './events.service';
import { ApiCreateEvent, ApiDeleteEvent, ApiFindAllEvents, ApiFindOneEvent, ApiUpdateEvent } from './event.api';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventPaginationDto } from './dto/events-pagination.dto';
import { EventDto } from './dto/event.dto';
import { EventFindAllQueryDto } from './dto/event-find-all-query.dto';

@Controller('events')
@ApiTags('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  @ProtectedRoute
  @ApiFindAllEvents
  async findAll(@Query() { page, limit, userId }: EventFindAllQueryDto): Promise<EventPaginationDto> {
    const events = await this.eventsService.findAll({ userId, page, limit });
    return events;
  }

  @Get(':id')
  @ProtectedRoute
  @ApiFindOneEvent
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<EventDto> {
    const event = await this.eventsService.findById(id);
    return event;
  }

  @Post()
  @ProtectedRoute
  @ApiCreateEvent
  async create(@Body() details: EventDetailsDto, @UserId() userId: number): Promise<EventDto> {
    const event = await this.eventsService.create(details, userId);
    return event;
  }

  @Put(':id')
  @ProtectedRoute
  @ApiUpdateEvent
  async update(
    @Body() details: UpdateEventDto,
    @Param('id', ParseIntPipe) id: number,
    @UserId() userId: number,
  ): Promise<EventDto> {
    const event = await this.eventsService.update(id, details, userId);
    return event;
  }

  @Delete(':id')
  @ProtectedRoute
  @HttpCode(204)
  @ApiDeleteEvent
  async delete(@Param('id', ParseIntPipe) id: number, @UserId() userId: number) {
    await this.eventsService.delete(id, userId);
  }
}
