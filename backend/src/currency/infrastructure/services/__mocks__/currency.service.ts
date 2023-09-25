import { currenciesListStub, currencyStub } from "../../../../../test/unit/currency/stub/currency.stub";


export const CurrencyService = jest.fn().mockReturnValue({
    create: jest.fn().mockReturnValue(currencyStub()),
    findAll: jest.fn().mockResolvedValue(currenciesListStub()),
    findOne: jest.fn().mockReturnValue(currencyStub()),
    update: jest.fn(),
    findById: jest.fn().mockReturnValue(currencyStub())
})