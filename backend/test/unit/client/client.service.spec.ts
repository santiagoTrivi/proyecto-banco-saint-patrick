import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from '../../../src/client/infrastructure/services/client.service';
import {
  Client,
  ClientDocument,
} from '../../../src/client/infrastructure/schemas/client.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientEntity } from '../../../src/client/domain/client.entity';
import { clientStub } from './stub';

describe('clientService', () => {
  let clientService: ClientService;
  let clientModel: Model<ClientDocument>;

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

    clientService = module.get<ClientService>(ClientService);
    clientModel = module.get<Model<ClientDocument>>(getModelToken(Client.name));
  });

  it('should be defined', () => {
    expect(clientService).toBeDefined();
  });

  describe('ClientService finding client methods', () => {
    let client: ClientEntity;
    let findOneSpy: any;

    const username = clientStub().username;

    beforeEach(async () => {
      findOneSpy = jest.spyOn(clientModel, 'findOne').mockResolvedValueOnce({});
      client = await clientService.findOneByUsername(username);
    });

    test('should  call findOne with the provided username', async () => {
      expect(findOneSpy).toHaveBeenCalledWith({ username });
    });
  });
});
