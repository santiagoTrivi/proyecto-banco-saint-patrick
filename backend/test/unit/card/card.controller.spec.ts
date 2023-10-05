import { Test, TestingModule } from '@nestjs/testing';
import { CardService } from '../../../src/card/infrastructure/service/card.service';
import { CardController } from '../../../src/card/card.controller';
import { getModelToken } from '@nestjs/mongoose';
import { Card, CardDocument } from '../../../src/card/infrastructure/schemas/card.schema';
import { Model } from 'mongoose';
import { AddCardProcess, GetCardInfo, RegisterCard, UpdateCardtInfo } from '../../../src/card/usecase';
import { ClientService } from '../../../src/client/infrastructure/services/client.service';
import { Client } from '../../../src/client/infrastructure/schemas/client.schema';
import { reqStube } from '../auth/stub/requestStub';
import { CreateCardDto } from '../../../src/card/infrastructure/Dto/create-card.dto';
import { cardStub, cardStubResult } from './stub/card.stub';


jest.mock('../../../src/card/infrastructure/service/card.service');

const useCaseClass = {
  run: jest.fn(obj => cardStub())
}

const mockGetCardInfo = {
  run: jest.fn(id => {
    const card = cardStub();
    const {PIN, ...result} = card;
    return result;
  })
}

describe('CardModule', () => {
  let cardController: CardController;
  let cardmodel: Model<CardDocument>;
  let cardSerive: CardService;
  let registerCard: RegisterCard;
  let addCardProcess: AddCardProcess;
  let getCardInfo: GetCardInfo;

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
      {
        provide: RegisterCard,
        useValue: useCaseClass
      },
      {
        provide: AddCardProcess,
        useValue: useCaseClass
      },
      {
        provide: GetCardInfo,
        useValue: mockGetCardInfo
      },
        CardService,
        ClientService,
        UpdateCardtInfo,
        ],
      exports: [CardService],
    }).compile();

    cardController = module.get<CardController>(CardController);
    cardmodel = module.get<Model<CardDocument>>(getModelToken(Card.name))
    cardSerive = module.get<CardService>(CardService);
    registerCard = module.get<RegisterCard>(RegisterCard);
    addCardProcess = module.get<AddCardProcess>(AddCardProcess);
    getCardInfo = module.get<GetCardInfo>(GetCardInfo);
  });
  
  describe('cardController and CardService', () => {

    test('CardController should be defined', () => {
        expect(cardController).toBeDefined();
    })

    test('CardService should be defined', () => {
        expect(cardSerive).toBeDefined();
    })
  })

  describe('creating a new card', () => {
    let result;
    const req = reqStube();
    const createCardDto: CreateCardDto = {
      PIN: '',
      currencyId: ''
    }
  
    beforeEach(async () => {
      result = await cardController.addCard(req, createCardDto)
    })

    test('should call addCardProcess useCase Class', () => {
      expect(addCardProcess.run).toHaveBeenCalled()
    })

    test('should call addCardProcess class with the correct parameters', () => {
      expect(addCardProcess.run).toHaveBeenLastCalledWith(req.user.uuid, createCardDto)
    })

    test('should return a cardEntity object', () => {
      expect(result).toEqual(cardStubResult())
    })

    test('should call registerCard class ', () => {
      expect(registerCard.run).toHaveBeenCalled()
    })

  })

  describe('getting card info', () => {

    let result;
    let id= '789456'

    beforeEach(async () => {
      result = await cardController.getCard(id);

    })

    test('should call getCardInfo class useCase Class', () => {
      expect(getCardInfo.run).toHaveBeenCalled()
    })

    test('should call getCardInfo class with the correct parameter', () => {
      expect(getCardInfo.run).toHaveBeenLastCalledWith(id)
    })

    test('should return a cardEntity without the PIN', () => {
      expect(result).not.toEqual(cardStubResult())
    })


  })
 
});
