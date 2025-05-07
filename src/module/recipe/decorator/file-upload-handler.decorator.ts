import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';

export default function FileUploadHandler(fileName: string, destinationPath: string) {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fileName, {
        storage: diskStorage({
          destination: destinationPath,
          filename: (_req, file, cb) => {
            const extension = extname(file.originalname);
            const uniqueName = `${randomUUID()}${extension}`;
            cb(null, uniqueName);
          },
        }),
      }),
    ),
  );
}
