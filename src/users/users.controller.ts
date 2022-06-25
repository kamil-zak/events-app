import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import ProtectedRoute from 'src/common/decorators/protected-route.decorator';
import UserId from 'src/common/decorators/user-id.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserDto } from './dto/user.dto';
import { ApiChangePassword, ApiGetProfile, ApiUpdateAvatar } from './users.api';
import { UsersService } from './users.service';

@Controller('profile')
@ProtectedRoute
@ApiTags('profile')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  @ApiGetProfile
  async getUser(@UserId() userId: number): Promise<UserDto> {
    const user = await this.usersService.findById(userId);
    if (!user) throw new InternalServerErrorException();
    return user;
  }

  @Put('/password')
  @ApiChangePassword
  @HttpCode(204)
  async changePassword(@UserId() userId: number, @Body() body: ChangePasswordDto) {
    await this.usersService.changePassword(userId, body);
  }

  @Put('/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiUpdateAvatar
  @HttpCode(204)
  async updateAvatar(@UserId() userId: number, @UploadedFile() avatar?: Express.Multer.File) {
    if (!avatar) throw new BadRequestException('File was not provided');
    await this.usersService.updateAvatar(userId, avatar);
  }
}
