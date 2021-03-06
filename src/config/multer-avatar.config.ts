import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';

type DoneFn<T> = (error: Error | null, param: T) => void;

const multerOptions: MulterOptions = {
  limits: {
    fileSize: 5242880,
  },
  fileFilter: (req: Request, file: Express.Multer.File, done: DoneFn<boolean>) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) done(null, true);
    else done(new BadRequestException('Bad file format'), false);
  },
  storage: diskStorage({
    destination: './uploads/temp',
    filename: (req: Request, file: Express.Multer.File, done: DoneFn<string>) => {
      done(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
};

export default multerOptions;
