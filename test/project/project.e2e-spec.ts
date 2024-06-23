import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import * as request from 'supertest';

let app: INestApplication;
let testingModule: TestingModule;

beforeAll(async () => {
  testingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = testingModule.createNestApplication();
  app.useGlobalPipes( new ValidationPipe({
		forbidNonWhitelisted: true, // 작성된 필수값이 수신되지 않을 경우 에러
		transform: true,            // 타입을 변환
  }))
  await app.init();
});

afterAll(async () => {
    await app.close();
})

describe('[e2e] POST /projects', () => {
  it('Should respond 201 created project', async () => {
    const response = await request(app.getHttpServer()).post('/projects').send({ title: 'NBA 중계 협상권' });
    expect(response.status).toBe(201);
  });

  it('Should respond 400 invalid project title', async () => {
    const response = await request(app.getHttpServer()).post('/projects').send({ title: null });
    expect(response.status).toBe(400);
  })
});