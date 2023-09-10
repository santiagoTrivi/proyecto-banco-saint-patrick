import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../../src/auth/auth.controller';
import { AuthService } from '../../../src/auth/infrastructure/services/auth.service';
import { GetClientInfo } from '../../../src/auth/useCase/getClientInfo';
import { ClientService } from '../../../src/client/infrastructure/services/client.service';
import { getModelToken } from '@nestjs/mongoose';
import { Client } from '../../../src/client/infrastructure/schemas/client.schema';
import { Model } from 'mongoose';
import { clientStub } from '../stub';
import { IAuthentication } from '../../../src/auth/domain/interface/IAuthentication';

jest.mock('../../../src/auth/infrastructure/services/auth.service');

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let getClientInfo: GetClientInfo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: getModelToken(Client.name),
          useValue: Model,
        },
        AuthService,
        GetClientInfo,
        ClientService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
