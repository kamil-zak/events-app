import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { FilesService } from './files.service';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Get('avatar/:userId')
  @ApiResponse({ status: 200, description: 'Avatar of user or default avatar.' })
  async getAvatar(@Param('userId') id: string, @Res() res: Response) {
    const avatarPath = await this.filesService.getUserAvatarPath(id);
    res.sendFile(avatarPath);
  }
}
