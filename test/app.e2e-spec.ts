import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Clients routes', () => {
  let app: INestApplication;
  const UnauthorizedError = '{"message":"Unauthorized","statusCode":401}';
  const FAKE_TOKEN = 'token';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should not access GET /clients route without token', () => {
    return request(app.getHttpServer())
      .get('/clients')
      .expect(401)
      .expect(UnauthorizedError);
  });

  it('should not access GET /clients route with a wrong token', () => {
    return request(app.getHttpServer())
      .get('/clients')
      .set('Authorization', `Bearer ${FAKE_TOKEN}`)
      .expect(401)
      .expect(UnauthorizedError);
  });

  it('should not access GET /clients/:id route without token', () => {
    return request(app.getHttpServer())
      .get('/clients/1')
      .expect(401)
      .expect(UnauthorizedError);
  });

  it('should not access GET /clients/:id route with a wrong token', () => {
    return request(app.getHttpServer())
      .get('/clients/1')
      .set('Authorization', `Bearer ${FAKE_TOKEN}`)
      .expect(401)
      .expect(UnauthorizedError);
  });

  it('should not access POST /clients route without token', () => {
    return request(app.getHttpServer())
      .post('/clients')
      .expect(401)
      .expect(UnauthorizedError);
  });

  it('should not access POST /clients route with a wrong token', () => {
    return request(app.getHttpServer())
      .post('/clients')
      .set('Authorization', `Bearer ${FAKE_TOKEN}`)
      .expect(401)
      .expect(UnauthorizedError);
  });

  it('should not access PATCH /clients/:id route without token', () => {
    return request(app.getHttpServer())
      .patch('/clients/1')
      .expect(401)
      .expect(UnauthorizedError);
  });

  it('should not access PATCH /clients/:id route with a wrong token', () => {
    return request(app.getHttpServer())
      .patch('/clients/1')
      .set('Authorization', `Bearer ${FAKE_TOKEN}`)
      .expect(401)
      .expect(UnauthorizedError);
  });

  it('should not access DELETE /clients/:id route without token', () => {
    return request(app.getHttpServer())
      .delete('/clients/1')
      .expect(401)
      .expect(UnauthorizedError);
  });

  it('should not access DELETE /clients/:id route with a wrong token', () => {
    return request(app.getHttpServer())
      .delete('/clients/1')
      .set('Authorization', `Bearer ${FAKE_TOKEN}`)
      .expect(401)
      .expect(UnauthorizedError);
  });
});
