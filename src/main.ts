import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( new ValidationPipe({
		forbidNonWhitelisted: true, // 작성된 필수값이 수신되지 않을 경우 에러
		transform: true,            // 타입을 변환
  }))

  const options = new DocumentBuilder()
    .setTitle('Project API Docs')
    .setDescription('Lattice backend engineer challenge')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  
  await app.listen(80);
}
bootstrap();
