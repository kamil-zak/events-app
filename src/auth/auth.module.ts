import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import multerAvatarOptions from 'src/config/multer-avatar.config';
import { MulterModule } from '@nestjs/platform-express';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [UsersModule, PassportModule, JwtModule, FilesModule, MulterModule.register(multerAvatarOptions)],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
