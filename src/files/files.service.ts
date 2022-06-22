import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { promises } from 'fs';
import { resolve } from 'path';

@Injectable()
export class FilesService {
  private getAvatarPath(filename: string) {
    return resolve(__dirname, '..', '..', 'uploads', 'avatars', filename);
  }

  async getUserAvatarPath(userId: string) {
    try {
      await promises.access(this.getAvatarPath(`${userId}.jpg`));
      return this.getAvatarPath(`${userId}.jpg`);
    } catch (e) {
      return this.getAvatarPath(`default.jpg`);
    }
  }

  async storeAvatar(file: Express.Multer.File, userId) {
    const resized = await sharp(file.path)
      .resize(200, 200)
      .toFormat('jpg')
      .jpeg({
        quality: 100,
        force: true,
      })
      .toBuffer();
    await promises.writeFile(this.getAvatarPath(`${userId}.jpg`), resized);
    await promises.unlink(file.path);
  }
}
