import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../src/auth/infrastructure/services/auth.service';
import { ClientService } from '../../../src/client/infrastructure/services/client.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Client } from '../../../src/client/infrastructure/schemas/client.schema';
import { Model } from 'mongoose';
import { clientStub } from '../client/stub';
import { IAuthentication } from '../../../src/auth/domain/interface/IAuthentication';
import { ClientEntity } from '../../../src/client/domain/client.entity';

//jest.mock('../../../src/auth/infrastructure/services/auth.service');

describe('AuthService', () => {
  let service: AuthService;
  let clientService: ClientService;
  let jwtService: JwtService;
  let configService: ConfigService;

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
    clientService = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login method', () => {
    let authentication: IAuthentication;

    describe('validateClient', () => {
      it('should return null for false client validatation', async () => {
        jest.spyOn(clientService, 'findOne').mockResolvedValueOnce(null);

        const result = await service.validateClient('invalidUser', 'password');
        expect(result).toBeNull();
      });
    });
  });
});
