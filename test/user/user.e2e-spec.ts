import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@app/app.module';
import { Connection } from 'mongoose';
import { UserService } from '@app/users';
import { DatabaseService } from '@app/database';

describe('User', () => {
  let app: INestApplication;
  let connection: Connection;
  let userService: UserService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    userService = moduleRef.get<UserService>(UserService);
    connection = moduleRef.get<DatabaseService>(DatabaseService).getDbHandle();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close(true);
    await app.close();
  });

  describe('GET /users', () => {
    it('should return an array of users', async () => {
      const users = await userService.findAll();
      const response = await request(app.getHttpServer()).get('/users');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(users);
    });
  });

  describe('POST /users', () => {
    it('should create a user', async () => {
      const user = {
        name: 'Teste',
        email: 'johndoe@teste.com',
        password: '123456',
        cpf: '12345678901',
        phone: '12345678901',
      };

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(user);

      expect(response.status).toBe(201);
      expect(response.body).toBeTruthy();
    });
  });

  describe('GET /users/:id', () => {
    it('should return a user', async () => {
      const users = await userService.findAll();

      const id = users[users.length - 1].id;
      const user = await userService.findById(users[users.length - 1].id);
      const response = await request(app.getHttpServer()).get(`/users/${id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(user);
    });

    it('should return a 404', async () => {
      return request(app.getHttpServer())
        .get(`/users/123456789012345678901234`)
        .expect(404);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user', async () => {
      const users = await userService.findAll();

      const id = users[users.length - 1].id;
      const response = await request(app.getHttpServer()).delete(
        `/users/${id}`,
      );

      expect(response.status).toBe(200);
      expect(response.body).toBeTruthy();
    });

    it('should return a 404', async () => {
      return request(app.getHttpServer())
        .delete(`/users/123456789012345678901234`)
        .expect(404);
    });
  });
});
