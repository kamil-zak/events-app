import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FilesModule } from 'src/files/files.module';
import { MulterModule } from '@nestjs/platform-express';
import multerAvatarOptions from 'src/config/multer-avatar.config';

@Module({
  imports: [FilesModule, SequelizeModule.forFeature([User]), MulterModule.register(multerAvatarOptions)],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
