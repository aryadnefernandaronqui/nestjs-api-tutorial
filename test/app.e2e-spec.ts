import { AuthDto } from '@/auth/dto';
import { CreateBookmarkDto } from '@/bookmark/dto';
import { EditUserDto } from '@/user/dto';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as dotenv from 'dotenv';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import db from '../src/config/db/database';
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
    pactum.request.setBaseUrl('http://localhost:3333');
  });
  afterAll(async () => {
    await app.close();
    await db.destroy();
  });

  //teste de autenticação

  describe('Auth', () => {
    const dto: AuthDto = {
      first_name: 'adfasdf',
      last_name: 'dafsdfdsf',
      email: '2ddddd5s0@example.com',
      password: 'password',
    };

    //teste para cadastro
    describe('Sigup', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            first_name: dto.first_name,
            last_name: dto.last_name,
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            first_name: dto.first_name,
            last_name: dto.last_name,
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if body empty', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
      it('Should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    //teste para login
    describe('Signin', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            first_name: dto.first_name,
            last_name: dto.last_name,
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            first_name: dto.first_name,
            last_name: dto.last_name,
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if body empty', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
      it('Should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });

  //testes de usuário

  describe('User', () => {
    describe('Get user', () => {
      it('Should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .inspect();
      });
    });

    describe('Edit user', () => {
      it('Should edit current user', () => {
        const dto: EditUserDto = {
          first_name: 'José',
        };
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200);
      });
    });
  });

  //testes de bookmark

  describe('Bookmark', () => {
    describe('Get empty bookmarks', () => {
      it('Should get empty bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });
    describe('Create bookmark', () => {
      const dto: CreateBookmarkDto = {
        title: 'First bookmark',
        author: 'First bookmark author',
        link: 'https://google.com',
        description: 'First bookmark description',
      };
      it('Should create bookmarks', () => {
        return pactum
          .spec()
          .post('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('Get bookmark', () => {});
    describe('Get bookmark by id', () => {});
    describe('Edit bookmark by id', () => {});
    describe('Delete bookmark by id', () => {});
  });
});
