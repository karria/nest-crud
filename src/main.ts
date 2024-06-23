import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( new ValidationPipe({
		forbidNonWhitelisted: true, // 작성된 필수값이 수신되지 않을 경우 에러
		// transform: true,            // 타입을 변환
  }))
  await app.listen(80);
}
bootstrap();
