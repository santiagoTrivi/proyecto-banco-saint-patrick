import { Currency } from './currency.model';

export interface CurrenciesRepository {
	findCurrencies(): Promise<Currency[]>;
}
