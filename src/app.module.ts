import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { FilesModule } from './files/files.module';
import sequelizeConfig from './config/sequelize.config';
import envConfig from './config/env.config';

@Module({
  imports: [
    SequelizeModule.forRootAsync(sequelizeConfig),
    ConfigModule.forRoot(envConfig),
    ScheduleModule.forRoot(),
    EventsModule,
    AuthModule,
    TasksModule,
    FilesModule,
  ],
})
export class AppModule {}
