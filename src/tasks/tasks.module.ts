import { Module } from '@nestjs/common';
import { EventsModule } from 'src/events/events.module';
import { TasksService } from './tasks.service';

@Module({
  imports: [EventsModule],
  providers: [TasksService],
})
export class TasksModule {}
