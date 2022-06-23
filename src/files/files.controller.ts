import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { FilesService } from './files.service';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Get('avatar/:userId')
  @ApiOperation({ description: 'Get user avatar or default avatar if user does not have.' })
  @ApiResponse({ status: 200, description: 'User avatar was retuned successfully' })
  async getAvatar(@Param('userId', ParseIntPipe) id: number, @Res() res: Response) {
    const avatarPath = await this.filesService.getUserAvatarPath(id);
    res.sendFile(avatarPath);
  }
}
