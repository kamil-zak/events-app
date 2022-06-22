import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventsService } from 'src/events/events.service';

@Injectable()
export class TasksService {
  constructor(private eventsService: EventsService) {}

  @Cron(CronExpression.EVERY_WEEK)
  handleCron() {
    this.eventsService.deleteCompleted();
  }
}
