import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ClientService } from '../../../src/client/infrastructure/services/client.service';
import { DataCipher } from '../../../src/common/useCase/dataCipher';
import { AuthService } from '../../../src/auth/infrastructure/services/auth.service';
import { ForbiddenException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Client } from '../../../src/client/infrastructure/schemas/client.schema';
import { Model } from 'mongoose';
import { mockClientModel } from '../client/stub/mockClientmodel';


jest.mock('../../../src/auth/infrastructure/services/auth.service');

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let configService: ConfigService;
  let clientService: ClientService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Client.name),
          useValue: mockClientModel,
        },
        AuthService,
        JwtService,
        ConfigService,
        ClientService,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
    clientService = module.get<ClientService>(ClientService);
  });

  it('should be define ', () => {
    expect(authService).toBeDefined()
  })


});
