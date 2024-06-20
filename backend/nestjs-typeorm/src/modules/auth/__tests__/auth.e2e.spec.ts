import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { configApp } from 'src/app.config';
import { AppModule } from 'src/app.module';
import { VALIDATION_EXCEPTION } from 'src/utils/constants';
import { mockCreateAndSave, mockFindOne } from 'test/mocks';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/modules/users/users.entity';
import { Repository } from 'typeorm';

describe('Auth Route (e2e)', () => {
  let server;
  let app: INestApplication;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue({ findOne: jest.fn(), create: jest.fn(), save: jest.fn() })
      .compile();

    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    app = module.createNestApplication();
    server = app.getHttpServer();
    await configApp(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('[POST] Signup User', () => {
    const route = '/api/auth/sign-up/v1';
    describe(`Route - ${route}`, () => {
      it('[POST] should return error if payload not provided', async () => {
        const response = await request(server).post(route);
        const error = response.body;

        expect(error.error).toBe(VALIDATION_EXCEPTION);

        expect(error.message).toEqual([
          { property: 'name', message: 'name should not be empty' },
          { property: 'email', message: 'email should not be empty' },
          {
            property: 'password',
            message: 'password should not be empty',
          },
        ]);
      });

      it('[POST] should return error if email and password are invalid', async () => {
        const response = await request(server).post(route).send({
          name: 'Bipin Shrestha',
          email: 'invalidemail',
          password: 'password',
        });
        const error = response.body;

        expect(error.error).toBe(VALIDATION_EXCEPTION);

        expect(error.message).toEqual([
          { property: 'email', message: 'email must be an email' },
          {
            property: 'password',
            message:
              'Must be at least 8 Characters with uppercase, lowercase, number and special characters',
          },
        ]);
      });

      it('[POST] should return error if email already exists', async () => {
        mockFindOne({ repository: userRepository, data: { id: uuidv4() } });
        const response = await request(server).post(route).send({
          name: 'Bipin Shrestha',
          email: 'bipin@shrestha.com',
          password: 'Password123!@#',
        });

        const error = response.body;

        expect(error.message).toBe('Email already exists');
      });

      it('[POST] should create user and return response', async () => {
        mockFindOne({ repository: userRepository, data: null });

        const payload = {
          name: 'Bipin Shrestha',
          email: 'bipin@shrestha.com',
          password: 'Password123!@#',
        };
        mockCreateAndSave({ repository: userRepository, data: payload });
        const response = await request(server).post(route).send(payload);

        const userFindQuery = (userRepository.findOne as jest.Mock).mock.calls[0][0];

        expect(userFindQuery).toEqual({ where: { email: payload.email }, select: ['id'] });

        expect(response.body).toEqual({ name: payload.name, email: payload.email });

        const cookies = response.headers['set-cookie'];
        expect(cookies).toBeDefined();

        expect(cookies[0]).toContain('access_token');
        expect(cookies[0]).toContain('HttpOnly');
        expect(cookies[0]).toContain('Secure');
        expect(cookies[0]).toContain('SameSite=Lax');
      });
    });
  });

  describe('[POST] Signin User', () => {
    const route = '/api/auth/sign-in/v1';
    describe(`Route - ${route}`, () => {
      it('[POST] should return error if payload not provided', async () => {
        const response = await request(server).post(route);
        const error = response.body;
        expect(error.error).toBe(VALIDATION_EXCEPTION);
        expect(error.message).toEqual([
          { property: 'email', message: 'email should not be empty' },
          {
            property: 'password',
            message: 'password should not be empty',
          },
        ]);
      });

      it('[POST] should return error if email is invalid', async () => {
        const response = await request(server).post(route).send({
          email: 'invalidemail',
          password: 'password',
        });
        const error = response.body;
        expect(error.error).toBe(VALIDATION_EXCEPTION);
        expect(error.message).toEqual([{ property: 'email', message: 'email must be an email' }]);
      });

      it('[POST] should return error if user not found', async () => {
        mockFindOne({ repository: userRepository, data: null });
        const response = await request(server).post(route).send({
          email: 'bipin@shrestha.com',
          password: 'Password123!@#',
        });
        const error = response.body;
        expect(error.message).toBe('Invalid email or password');
      });

      it('[POST] should return error if password do not match', async () => {
        const payload = {
          email: 'bipin@shrestha.com',
          password: 'Password123!@#',
        };
        mockFindOne({ repository: userRepository, data: { id: uuidv4() } });
        (bcrypt.compare as jest.Mock) = jest.fn().mockResolvedValue(false);
        const response = await request(server).post(route).send(payload);
        const error = response.body;
        expect(error.message).toBe('Invalid email or password');
      });

      it('[POST] should sign in the user', async () => {
        const payload = {
          email: 'bipin@shrestha.com',
          password: 'Password123!@#',
        };
        const name = 'Bipin Shrestha';
        mockFindOne({ repository: userRepository, data: { id: uuidv4(), name, ...payload } });
        (bcrypt.compare as jest.Mock) = jest.fn().mockResolvedValue(true);

        const response = await request(server).post(route).send(payload);

        const userFind = (userRepository.findOne as jest.Mock).mock;
        const userFindQuery = userFind.calls[0][0];
        expect(userFindQuery).toEqual({
          where: { email: payload.email },
          select: ['name', 'email', 'password'],
        });

        expect(response.body).toEqual({ name, email: payload.email });

        const cookies = response.headers['set-cookie'];
        expect(cookies).toBeDefined();
        expect(cookies[0]).toContain('access_token');
        expect(cookies[0]).toContain('HttpOnly');
        expect(cookies[0]).toContain('Secure');
        expect(cookies[0]).toContain('SameSite=Lax');
      });
    });
  });
});
