import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../src/auth/infrastructure/services/auth.service';
import { ClientService } from '../../../src/client/infrastructure/services/client.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Client } from '../../../src/client/infrastructure/schemas/client.schema';
import { Model } from 'mongoose';
import { clientStub } from '../stub';
import { IAuthentication } from '../../../src/auth/domain/interface/IAuthentication';

jest.mock('../../../src/auth/infrastructure/services/auth.service');

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Client.name),
          useValue: Model,
        },
        AuthService,
        JwtService,
        ConfigService,
        ClientService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login method', () => {
    let authentication: IAuthentication;

    beforeEach(async () => {
      const data = {
        _id: clientStub()._id,
        firstName: clientStub().firstName,
        lastName: clientStub().lastName,
        username: clientStub().username,
        password: clientStub().password,
        isActive: clientStub().isActive,
      };
      authentication = await service.login(data);
    });

    test('should have been called with AuthService.login', () => {
      expect(service.login).toBeCalledWith(clientStub());
    });

    test('should login in successfuly', () => {
      expect(authentication).toEqual({
        expireIn: '60s',
        access_token: expect.any(String),
        refresh_token: expect.any(String),
        refreshExpireIn: '7d',
      });
    });
  });

});
