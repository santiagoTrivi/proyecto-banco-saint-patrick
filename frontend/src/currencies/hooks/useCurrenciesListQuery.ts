import { CurrenciesRepository } from '@/currencies/domain';
import { CurrenciesNestRepository } from '@/currencies/services';
import { currenciesQueryKeys } from '@/currencies/utils';
import { useQuery } from '@tanstack/react-query';

export function useCurrenciesListQuery(
	currenciesRepository: CurrenciesRepository = CurrenciesNestRepository()
) {
	return useQuery(currenciesQueryKeys.findCurrencies(), async () => {
		return await currenciesRepository.findCurrencies();
	});
}
