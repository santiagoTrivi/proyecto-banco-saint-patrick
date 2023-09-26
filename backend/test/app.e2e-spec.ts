import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TokensStub, newClient } from './unit/client/stub';
import { UnauthorizedErrorReposnse, usernameExistError } from './unit/common/stubs/errorResponse';
import { newCurrency } from './unit/currency/stub/currency.stub';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  describe('Auth path', () => {

    const data = {
      username: "randomUser",
      password: "randomPassword"
    }
    const client = newClient();

    const USER_AlREADY_EXIST_RESPONSE = usernameExistError()

    test('should throw an Unauthorization error for a not registered username', () => {
      return request(app.getHttpServer())
      .post('/api/auth/login')
      .send(data)
      .expect(401)
      .expect(UnauthorizedErrorReposnse());
    })

    // make sure that this data does not exist in the database
    test('should create a new client', () => {
      return request(app.getHttpServer())
      .post('/api/auth/client')
      .send(client)
      .expect(201)
    })

    test('should throw an error trying to register a existed username', () => {
      return request(app.getHttpServer())
      .post('/api/auth/client')
      .send(client)
      .expect(400)
    })

    test('should authenticate the new client with the correct data', () => {
      return request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        username: client.username,
        password: client.password
      })
      .expect(200)
      .expect((res) => {
        const actualResponse = JSON.parse(res.text);
        expect(actualResponse).toEqual(TokensStub());
      })
    })

    test('should not authenticate the client with the incorrect data', () => {
      return request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        username: client.username,
        password: 'anotherPassword'
      })
      .expect(401)
    })
    
  })

  describe('Currency path', () => {
    const urlCurrency = '/api/currency';
    const currency = newCurrency();

    test('should get all the current currencies in the database successfuly', () => {
      return request(app.getHttpServer())
      .get(urlCurrency)
      .expect(200)
    })

    test('should create a new currency successfully', () => {
      return request(app.getHttpServer())
      .post(urlCurrency)
      .send(currency)
      .expect(201)
    })

    test('should throw an error trying to register a existed currency', () => {
      return request(app.getHttpServer())
      .post(urlCurrency)
      .send(currency)
      .expect(400)
    })

  })


});
