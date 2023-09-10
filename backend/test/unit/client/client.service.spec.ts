import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from '../../../src/client/infrastructure/services/client.service';
import { Client } from '../../../src/client/infrastructure/schemas/client.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

jest.mock('../../../src/client/infrastructure/services/client.service');

describe('clientService', () => {
  let service: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Client.name),
          useValue: Model,
        },
        ClientService,
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
