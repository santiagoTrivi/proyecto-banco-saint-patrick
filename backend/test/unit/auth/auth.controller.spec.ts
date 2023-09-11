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
    getClientInfo = module.get<GetClientInfo>(GetClientInfo);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login endpoint',() => {
    let auth: IAuthentication;
    let client = clientStub();
    let tokens = TokensStub();

    const req = {
      client
    }

    beforeEach(async () => {
      auth = await controller.login(req);
    })

    test('should call authService.login', () => {
      expect(authService.login).toBeCalled()
    })

    test('should call login with req.client', () => {
      expect(authService.login).toHaveBeenCalledWith(req.client)
    })

    test('then it should return authentication tokens', () => {
      expect(auth).toEqual(tokens);
    })

  })
  
  describe('logout endpoint ', () => {

    const req = {
      user: userStub()
    }

    beforeEach(async () => {
      await controller.logout(req)
    })

    test('it should call logout', () => {
      expect(authService.logout).toBeCalled()
    })

    test('it should use req', () => {
      expect(authService.logout).toHaveBeenCalledWith(req.user.uuid)
    })

  })

});
