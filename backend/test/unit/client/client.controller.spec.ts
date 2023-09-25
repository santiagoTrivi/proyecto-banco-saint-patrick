import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from '../../../src/client/infrastructure/services/client.service';
import { ClientController } from '../../../src/client/client.controller';
import { getModelToken } from '@nestjs/mongoose';
import { Client } from '../../../src/client/infrastructure/schemas/client.schema';
import { Model } from 'mongoose';
import { AddCardProcess, RegisterCard } from '../../../src/card/usecase';
import { CardService } from '../../../src/card/infrastructure/service/card.service';
import { UpdateClientInfo } from '../../../src/client/useCase/updateClientInfo';
import { Card } from '../../../src/card/infrastructure/schemas/card.schema';

jest.mock('../../../src/client/infrastructure/services/client.service');

describe('ClientModule', () => {
  let clientService: ClientService;
  let clientController: ClientController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        {
          provide: getModelToken(Client.name),
          useValue: Model
        },
        {
          provide: getModelToken(Card.name),
          useValue: Model
        },
        ClientService,
        RegisterCard,
        AddCardProcess,
        CardService,
        UpdateClientInfo,],
      exports: [ClientService],
    }).compile();

    clientController = module.get<ClientController>(ClientController)
    clientService = module.get<ClientService>(ClientService);
  });

  describe('ClientController and ClientService', () => {

    test('ClientController should be defined', () => {
        expect(clientController).toBeDefined();
    })

    test('ClientService should be defined', () => {
        expect(clientService).toBeDefined();
    })
  })
});
