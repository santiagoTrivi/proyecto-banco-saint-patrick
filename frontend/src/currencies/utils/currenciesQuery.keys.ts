export const currenciesQueryKeys = {
	all: ['currencies'] as const,
	findCurrencies: () => [...currenciesQueryKeys.all, 'findCurrencies']
};
