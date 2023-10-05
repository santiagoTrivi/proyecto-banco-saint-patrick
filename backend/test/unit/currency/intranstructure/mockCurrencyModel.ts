import { currenciesListStub, currencyStub } from '../stub/currency.stub';


export const mockCurrencyModel = {
    save: jest.fn().mockImplementation(obj => obj),
    findById: jest.fn().mockImplementation(id => currencyStub()),
}


export const MockCurrencyService = jest.fn().mockReturnValue({
    create: jest.fn().mockReturnValue(currencyStub()),
    findAll: jest.fn().mockResolvedValue(currenciesListStub()),
    findOne: jest.fn().mockReturnValue(currencyStub()),
    update: jest.fn(),
    findById: jest.fn().mockReturnValue(currencyStub())
})