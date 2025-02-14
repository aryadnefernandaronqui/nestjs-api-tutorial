import { AuthDto } from '@/auth/dto';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as dotenv from 'dotenv';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
dotenv.config({ path: './.env' });

describe('App e2e', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(process.env.PORT ?? 3333);
  });
  afterAll(() => app.close());

  describe('Auth', () => {
    describe('Sigup', () => {
      it('Should signup', () => {
        const dto: AuthDto = {
          first_name: 'John',
          last_name: 'Doe',
          email: '1f0j9@example.com',
          password: 'password',
        };
        return pactum
          .spec()
          .post('http://localhost:3333/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Signin', () => {
      it.todo('Should signin');
    });
  });
  describe('User', () => {
    describe('Get user', () => {});

    describe('Edit user', () => {});
  });

  describe('Bookmark', () => {
    describe('Create bookmark', () => {});
    describe('Get bookmark', () => {});
    describe('Get bookmark by id', () => {});
    describe('Edit bookmark', () => {});
    describe('Delete bookmark', () => {});
  });
});
