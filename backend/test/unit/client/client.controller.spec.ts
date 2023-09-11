import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from '../../../src/client/infrastructure/services/client.service';

jest.mock('../../../src/client/infrastructure/services/client.service');

describe('ClientModule', () => {
  let clientService: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientService],
      exports: [ClientService],
    }).compile();

    clientService = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(clientService).toBeDefined();
  });
});
