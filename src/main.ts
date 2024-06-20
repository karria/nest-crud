import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( new ValidationPipe({
    whitelist: true,            // DTO에 작성한 값만 수신
		forbidNonWhitelisted: true, // DTO에 작성된 필수값이 수신되지 않을 경우 에러
		transform: true,            // DTO의 타입을 변환
  }))
  await app.listen(80);
}
bootstrap();
