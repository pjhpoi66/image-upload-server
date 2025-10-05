// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadsModule } from './uploads/uploads.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 앱 전체에서 ConfigService를 사용할 수 있도록 설정
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // TypeOrmModule에서 ConfigModule을 사용하도록 임포트
      inject: [ConfigService], // ConfigService를 주입
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(<string>configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // 개발 환경에서만 사용
        schema: configService.get<string>('DB_SCHEMA'),
      }),
    }),
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
