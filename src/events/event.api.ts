import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { EventDetailsDto } from './dto/event-details.dto';
import { EventPartialDetailsDto } from './dto/event-partial-details.dto';
import { EventDto } from './dto/event.dto';
import { EventPaginationDto } from './dto/events-pagination.dto';

const eventIdParam = { name: 'id', description: 'Event id' };
const eventNotFoundResponse = { status: 404, description: `Event is not found.` };
const eventBadRequestResponse = { status: 400, description: 'Incorrect event data structure.' };
const eventNoPermissionResponse = { status: 403, description: 'User does not have permission to this event.' };
const eventUnauthenticatedResponse = { status: 401, description: 'Unauhenticated request.' };

export const ApiFindAllEvents = applyDecorators(
  ApiBearerAuth(),
  ApiOperation({ description: 'Get array of events with pagination, sorted by startDate and endDate.' }),
  ApiResponse({ status: 200, description: `Pagination data and array of events`, type: EventPaginationDto }),
  ApiResponse({ status: 400, description: 'Page does not exists.' }),
  ApiResponse(eventUnauthenticatedResponse),
);

export const ApiFindOneEvent = applyDecorators(
  ApiBearerAuth(),
  ApiOperation({ description: 'Get event by id.' }),
  ApiParam(eventIdParam),
  ApiResponse({ status: 200, description: `Event data`, type: EventDto }),
  ApiResponse(eventNotFoundResponse),
  ApiResponse(eventUnauthenticatedResponse),
);

export const ApiCreateEvent = applyDecorators(
  ApiBearerAuth(),
  ApiOperation({ description: 'Create new event.' }),
  ApiBody({ description: 'Event data to create', required: true, type: EventDetailsDto }),
  ApiResponse({ status: 201, description: 'Event was successfully created', type: EventDto }),
  ApiResponse(eventBadRequestResponse),
  ApiResponse(eventUnauthenticatedResponse),
);

export const ApiUpdateEvent = applyDecorators(
  ApiBearerAuth(),
  ApiOperation({ description: 'Partial update event by id.' }),
  ApiBody({ description: 'Event data to update', required: true, type: EventPartialDetailsDto }),
  ApiParam(eventIdParam),
  ApiResponse({ status: 200, description: 'Event was successfully modified.', type: EventDto }),
  ApiResponse(eventBadRequestResponse),
  ApiResponse(eventNotFoundResponse),
  ApiResponse(eventNoPermissionResponse),
  ApiResponse(eventUnauthenticatedResponse),
);

export const ApiDeleteEvent = applyDecorators(
  ApiBearerAuth(),
  ApiOperation({ description: 'Delete event by id.' }),
  ApiParam(eventIdParam),
  ApiResponse({ status: 204, description: 'Event was successfully deleted' }),
  ApiResponse(eventNotFoundResponse),
  ApiResponse(eventNoPermissionResponse),
  ApiResponse(eventUnauthenticatedResponse),
);
