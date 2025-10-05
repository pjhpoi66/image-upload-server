// src/uploads/uploads.controller.ts

import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';
import type { Response } from 'express';

@Controller('uploads')
export class UploadsController {
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const { folder } = req.body;
          const uploadPath = join('./uploads', folder); // 예: './uploads/cats'

          // 폴더가 존재하지 않으면 생성
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('folder') folder: string,
  ) {
    // 이곳에서 파일 정보를 DB에 저장하는 로직을 추가합니다. (e.g., ImageService 호출)
    console.log(file);
    return {
      message: 'File uploaded successfully!',
      filePath: `/uploads/${folder}/${file.filename}`,
    };
  }

  // 리소스 서버 역할: 이미지 파일 제공
  @Get(':folder/:filename')
  seeUploadedFile(
    @Param('folder') folder: string,
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    return res.sendFile(filename, { root: join('./uploads', folder) });
  }
}
