import { ICurrency } from "../../../../src/currency/domain/interface/ICurrency";
import { currenciesListStub } from "../stub/currency.stub";

export const MockRegisterCurrency = {
    run: jest.fn((obj: ICurrency) => {
        const {code} = obj;
        const currencies = currenciesListStub();
        
        const IS_CURRENCY_REGISTERED = currencies.some(item => item.code === code);

        if (IS_CURRENCY_REGISTERED) {
            return new Error('CURRENCY_ALREADY_REGISTERED')
          }

        return obj;
    })
}