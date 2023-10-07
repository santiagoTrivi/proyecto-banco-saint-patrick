import { envVariables, httpReq } from '@/shared/utils';
import { CurrenciesRepository, Currency } from '@/src/currencies/domain';
import { currencyEndpointList } from '@/src/currencies/schemas';

export function CurrenciesNestRepository(): CurrenciesRepository {
	const baseUrl = envVariables.API_URL + 'currency';
	return {
		create: async (currency) => {
			return currency;
		},

		findCurrencies: async () => {
			const res = await fetch(baseUrl, {
				method: httpReq.get,
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			});

			const result = await res.json();

			if (!res.ok) {
				throw result;
			}

			const resultValidated = currencyEndpointList.parse(result);

			return resultValidated.map((currency) =>
				Currency.create({
					...currency,
					id: currency._id,
					flagLink: currency.flag_link
				})
			);
		}
	};
}
