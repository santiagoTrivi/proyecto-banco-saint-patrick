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
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RegisterClient } from '../../../src/auth/useCase/registerClient';

jest.mock('../../../src/auth/useCase/getClientInfo');

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
        ClientService,
        AuthService,
        GetClientInfo,
        RegisterClient,
        JwtService
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    getClientInfo = module.get<GetClientInfo>(GetClientInfo);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  }); 

  describe('get client info', () => {
    const req = {
      user: userStub(),
    };

    beforeEach(async () => {
      await controller.getclient(req);
    });

    test('it should call getClientInfo', () => {
      expect(getClientInfo.run).toBeCalled();
    });

    test('it should use req', () => {
      expect(getClientInfo.run).toHaveBeenCalledWith(req.user.uuid);
    });
  });
});
