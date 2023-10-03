import { Test, TestingModule } from '@nestjs/testing';
import { CardService } from '../../../src/card/infrastructure/service/card.service';
import { getModelToken } from '@nestjs/mongoose';
import { Card } from '../../../src/card/infrastructure/schemas/card.schema';
import { mockCardModel } from './infrastructure/mockCardModel';
import { Model } from 'mongoose';
import { cardStub } from './stub/card.stub';

//jest.mock('../../../src/card/infrastructure/service/card.service');


describe('CardModule', () => {
  let cardSerive: CardService;
  let CardModel: Model<any>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardService,
        {
            provide: getModelToken(Card.name),
            useValue: mockCardModel
        },

        ],
      exports: [CardService],
    }).compile();

    cardSerive = module.get<CardService>(CardService)
    CardModel = module.get<Model<any>>(getModelToken(Card.name));

  });
  
  describe('CardService', () => {


    test('CardService should be defined', () => {
        expect(cardSerive).toBeDefined();
    })
/*
    test('create', async () => {
        const createdCard = cardStub();
        const savedCard = cardStub();
        
        jest.spyOn(CardModel.prototype, 'save').mockRejectedValueOnce(savedCard);

        const result = await cardSerive.create(createdCard);

        expect(CardModel.prototype.save).toHaveBeenCalledWith(createdCard);
        expect(result).toEqual(savedCard);

    })
    */

  })
 
});
