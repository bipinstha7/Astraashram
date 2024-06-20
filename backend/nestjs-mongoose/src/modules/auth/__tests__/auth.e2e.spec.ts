import bcrypt from 'bcrypt';
import request from 'supertest';
import mongoose, { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { configApp } from 'src/app.config';
import { AppModule } from 'src/app.module';
import { User } from 'src/modules/users/users.schema';
import { VALIDATION_EXCEPTION } from 'src/utils/constants';
import { mockCreate, mockFindOneLeanSelect } from 'test/mocks';

describe('Auth Route (e2e)', () => {
  let server;
  let app: INestApplication;
  let userModel: Model<User>;
  const _id = new mongoose.Types.ObjectId().toString();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getModelToken(User.name))
      .useValue({ findOne: jest.fn(), create: jest.fn() })
      .compile();

    userModel = module.get<Model<User>>(getModelToken(User.name));
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
        mockFindOneLeanSelect({ model: userModel, data: { _id } });
        const response = await request(server).post(route).send({
          name: 'Bipin Shrestha',
          email: 'bipin@shrestha.com',
          password: 'Password123!@#',
        });

        const error = response.body;

        expect(error.message).toBe('Email already exists');
      });

      it('[POST] should create user and return response', async () => {
        mockFindOneLeanSelect({ model: userModel, data: null });

        const payload = {
          name: 'Bipin Shrestha',
          email: 'bipin@shrestha.com',
          password: 'Password123!@#',
        };
        mockCreate({ model: userModel, data: payload });
        const response = await request(server).post(route).send(payload);

        const userFindQuery = (userModel.findOne as jest.Mock).mock.calls[0][0];

        expect(userFindQuery).toEqual({ email: payload.email });

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
        mockFindOneLeanSelect({ model: userModel, data: null });
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
        mockFindOneLeanSelect({ model: userModel, data: { _id: 1234 } });
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
        mockFindOneLeanSelect({ model: userModel, data: { _id, name, ...payload } });
        (bcrypt.compare as jest.Mock) = jest.fn().mockResolvedValue(true);

        const response = await request(server).post(route).send(payload);

        const userFind = (userModel.findOne as jest.Mock).mock;
        const userFindQuery = userFind.calls[0][0];
        expect(userFindQuery).toEqual({ email: payload.email });

        const userSelect =
          userFind.results[0].value.lean.mock.results[0].value.select.mock.calls[0][0];

        expect(userSelect).toEqual('name email password');

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
