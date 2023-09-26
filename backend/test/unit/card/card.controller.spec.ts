import { Test, TestingModule } from '@nestjs/testing';
import { CardService } from '../../../src/card/infrastructure/service/card.service';
import { CardController } from '../../../src/card/card.controller';
import { getModelToken } from '@nestjs/mongoose';
import { Card } from '../../../src/card/infrastructure/schemas/card.schema';
import { Model } from 'mongoose';
import { AddCardProcess, GetCardInfo, RegisterCard, UpdateCardtInfo } from '../../../src/card/usecase';
import { ClientService } from '../../../src/client/infrastructure/services/client.service';
import { Client } from '../../../src/client/infrastructure/schemas/client.schema';


jest.mock('../../../src/card/infrastructure/service/card.service');

describe('CardModule', () => {
  let cardController: CardController;
  let cardSerive: CardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardController],  
      providers: [
        {
            provide: getModelToken(Card.name),
            useValue: Model
        },
        {
          provide: getModelToken(Client.name),
          useValue: Model
      },
        CardService,
        RegisterCard,
        AddCardProcess,
        ClientService,
        UpdateCardtInfo,
        GetCardInfo],
      exports: [CardService],
    }).compile();

    cardController = module.get<CardController>(CardController);
    cardSerive = module.get<CardService>(CardService)
  });
  
  describe('cardController and CardService', () => {

    test('CardController should be defined', () => {
        expect(cardController).toBeDefined();
    })

    test('CardService should be defined', () => {
        expect(cardSerive).toBeDefined();
    })
  })
 
});
