import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CurrencyController } from '../../../src/currency/currency.controller';
import { CurrencyService } from '../../../src/currency/infrastructure/services/currency.service';
import { Currency } from '../../../src/currency/infrastructure/schemas/currency.schema';
import { GetCurrencyInfo, RegisterCurrency } from '../../../src/currency/useCase';


jest.mock('../../../src/currency/infrastructure/services/currency.service');

describe('CurrencyModule', () => {
    let currencyController: CurrencyController;
    let currencyService: CurrencyService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyController],  
      providers: [
        {
            provide: getModelToken(Currency.name),
            useValue: Model
        },
        CurrencyService, 
        RegisterCurrency, 
        GetCurrencyInfo,],

    }).compile();

    currencyController = module.get<CurrencyController>(CurrencyController)
    currencyService = module.get<CurrencyService>(CurrencyService)
  });
  
  describe('CurrencyController and CurrencyService', () => {

    test('CurrencyController should be defined', () => {
        expect(currencyController).toBeDefined();
    })

    test('CurrencyService should be defined', () => {
        expect(currencyService).toBeDefined();
    })
  })
 
});
