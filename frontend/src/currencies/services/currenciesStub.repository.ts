import { CurrenciesRepository, Currency } from '@/src/currencies/domain';

export const currencyStub1 = Currency.create({
	id: '1',
	code: 'USD',
	name: 'Dolar',
	flagLink: '',
	isAvailable: true,
	symbol: '$'
});

export const currencyStub2 = Currency.create({
	id: '2',
	code: 'EUR',
	name: 'Euro',
	flagLink: '',
	isAvailable: true,
	symbol: '€'
});

export function CurrenciesStubRepository(): CurrenciesRepository {
	const currencyInMemory: Currency[] = [currencyStub1, currencyStub2];

	return {
		async findCurrencies() {
			return currencyInMemory;
		},
		async create(currency) {
			return currency;
		}
	};
}
