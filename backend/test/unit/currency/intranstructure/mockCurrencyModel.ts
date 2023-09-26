import { currencyStub } from "../stub/currency.stub";

export const mockCurrencyModel = {
    save: jest.fn().mockImplementation(obj => obj),
    findById: jest.fn().mockImplementation(id => currencyStub()),
}