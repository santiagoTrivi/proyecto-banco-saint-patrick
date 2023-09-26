import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CurrencyController } from '../../../src/currency/currency.controller';
import { CurrencyService } from '../../../src/currency/infrastructure/services/currency.service';
import { Currency } from '../../../src/currency/infrastructure/schemas/currency.schema';
import { GetCurrencyInfo, RegisterCurrency } from '../../../src/currency/useCase';
import { currencyStub } from './stub/currency.stub';
import { mockCurrencyModel } from './intranstructure/mockCurrencyModel';


jest.mock('../../../src/currency/infrastructure/services/currency.service');

describe('CurrencyService', () => {
    let currencyController: CurrencyController;
    let currencyService: CurrencyService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyController],  
      providers: [
        {
            provide: getModelToken(Currency.name),
            useValue: mockCurrencyModel
        },
        CurrencyService, 
        RegisterCurrency, 
        GetCurrencyInfo,],

    }).compile();

    currencyController = module.get<CurrencyController>(CurrencyController)
    currencyService = module.get<CurrencyService>(CurrencyService)
  });
  
  describe('CurrencyService', () => {
    let result;
    let getcurrency;
    let implementedMethod;
    const newCurrency = currencyStub();

    test('CurrencyService should be defined', () => {
        expect(currencyService).toBeDefined();
    })

    beforeEach(async () => {
        result = await currencyService.create(newCurrency)
        getcurrency = await currencyService.findById('123');
    })

    test('create a new currency and get it back', () => {
        expect(result).toEqual(newCurrency)
    })

    test('get a currency by id', () => {
        expect(getcurrency).toEqual(newCurrency);
    })

  })
 
});
