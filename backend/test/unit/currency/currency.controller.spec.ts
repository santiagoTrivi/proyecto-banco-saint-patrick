import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CurrencyController } from '../../../src/currency/currency.controller';
import { CurrencyService } from '../../../src/currency/infrastructure/services/currency.service';
import { Currency } from '../../../src/currency/infrastructure/schemas/currency.schema';
import { GetCurrencyInfo, RegisterCurrency } from '../../../src/currency/useCase';
import { MockRegisterCurrency } from './useCase/mockRegisterCurrency';
import { currencyStub, newCurrency } from './stub/currency.stub';


jest.mock('../../../src/currency/infrastructure/services/currency.service');

describe('CurrencyModule', () => {
    let currencyController: CurrencyController;
    let currencyService: CurrencyService
    let registerCurrency: RegisterCurrency;
    let getCurrencyInfo: GetCurrencyInfo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyController],  
      providers: [
        {
            provide: getModelToken(Currency.name),
            useValue: Model
        },
        {
          provide: RegisterCurrency,
          useValue: MockRegisterCurrency
        },
        CurrencyService,  
        GetCurrencyInfo,],

    }).compile();

    currencyController = module.get<CurrencyController>(CurrencyController);
    currencyService = module.get<CurrencyService>(CurrencyService);
    registerCurrency = module.get<RegisterCurrency>(RegisterCurrency);
    getCurrencyInfo = module.get<GetCurrencyInfo>(GetCurrencyInfo);
  });
  
  describe('CurrencyController and CurrencyService', () => {

    test('CurrencyController should be defined', () => {
        expect(currencyController).toBeDefined();
    })

    test('CurrencyService should be defined', () => {
        expect(currencyService).toBeDefined();
    })
  })

  describe('creating a new currency', () => {

    let result;
    let newCurrencyObj = currencyStub();

    beforeEach(async () => {
      result = await currencyController.register(newCurrencyObj);
    })

    test('should call RegisterCurrency useCase class', () => {
      expect(registerCurrency.run).toHaveBeenCalled();
    })

    test('should call RegisterCurrency with the specific paramenter', () => {
      expect(registerCurrency.run).toHaveBeenCalledWith(newCurrencyObj);
    })

    test('should throw an error if the currency is registered in the database', async () => {
      jest.spyOn(MockRegisterCurrency, 'run').mockReturnValue(new Error('CURRENCY_ALREADY_REGISTERED'));
      const result = await currencyController.register(newCurrencyObj);
      expect(registerCurrency.run).toHaveBeenCalledWith(newCurrencyObj);
      expect(result).toEqual(new Error('CURRENCY_ALREADY_REGISTERED'));
    })

    
  })
 
});
