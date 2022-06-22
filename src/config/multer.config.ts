import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';

const multerOptions: MulterOptions = {
  limits: {
    fileSize: 5242880,
  },
  fileFilter: (req: Request, file: Express.Multer.File, done: (error: Error, acceptFile: boolean) => void) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) done(null, true);
    else done(new Error('Invalid file type'), false);
  },
  storage: diskStorage({
    destination: './uploads/temp',
    filename: (req: Request, file: Express.Multer.File, done) => {
      done(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
};

export default multerOptions;
