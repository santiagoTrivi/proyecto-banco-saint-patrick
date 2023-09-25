import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../../src/auth/auth.controller';
import { AuthService } from '../../../src/auth/infrastructure/services/auth.service';
import { GetClientInfo } from '../../../src/auth/useCase/getClientInfo';
import { ClientService } from '../../../src/client/infrastructure/services/client.service';
import { getModelToken } from '@nestjs/mongoose';
import { Client } from '../../../src/client/infrastructure/schemas/client.schema';
import { Model } from 'mongoose';
import { TokensStub, clientStub, userStub } from '../client/stub';
import { IAuthentication } from '../../../src/auth/domain/interface/IAuthentication';
import { JwtStrategy, LocalStrategy, RefreshTokenStrategy } from '../../../src/auth/infrastructure/strategies';
import { RegisterClient } from '../../../src/auth/useCase/registerClient';
import { ConfigService } from '@nestjs/config';
import { MockJwtStrategy } from './infrastructure/strategies/mockJwtStrategy'
import { JwtModule, JwtService } from '@nestjs/jwt';

jest.mock('../../../src/auth/infrastructure/services/auth.service');

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let getClientInfo: GetClientInfo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [JwtModule],
      providers: [
        {
          provide: getModelToken(Client.name),
          useValue: Model,
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn()
          }
        },
        {
          provide: JwtStrategy,
          useClass: MockJwtStrategy
        },
        {
          provide: RefreshTokenStrategy,
          useClass: MockJwtStrategy
        },
        ClientService,
        AuthService,
        LocalStrategy,
        GetClientInfo,
        RegisterClient,
        JwtService
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    getClientInfo = module.get<GetClientInfo>(GetClientInfo);
  });
  
  describe('AuthController and AuthService', () => {

    test('AuthController should be defined', () => {
      expect(controller).toBeDefined();
    })

    test('AuthService should be defined', () => {
      expect(authService).toBeDefined();
    })

  })


  describe('AutherService - login method', () => {
    let auth: IAuthentication;
    const client = clientStub();
    const tokens = TokensStub();

    const req = {
      client,
    };

    beforeEach(async () => {
      auth = await controller.login(req);
    });

    test('should call authService.login', () => {
      expect(authService.login).toBeCalled();
    });

    test('should call login with req.client', () => {
      expect(authService.login).toHaveBeenCalledWith(req.client);
    });

    test('then it should return authentication tokens', () => {
      expect(auth).toEqual(tokens);
    });
  });


  describe('AutherService - logout method', () => {
    const req = {
      user: userStub(),
    };

    beforeEach(async () => {
      await controller.logout(req);
    });

    test('it should call logout', () => {
      expect(authService.logout).toBeCalled();
    });

    test('it should use req', () => {
      expect(authService.logout).toHaveBeenCalledWith(req.user.uuid);
    });
  });

});
