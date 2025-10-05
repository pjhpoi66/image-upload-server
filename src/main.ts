// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 'uploads' 폴더를 정적 파일 경로로 설정
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // URL 프리픽스 설정
  });
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
