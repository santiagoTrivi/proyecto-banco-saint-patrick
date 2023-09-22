import { useAuthStore } from '@/auth/state';
import { envVariables, httpReq } from '@/shared/utils';
import { transactionEndpointToModel } from '@/transactions/adapters/';
import { TransactionsRepository } from '@/transactions/domain';
import { transactionPaginatedGet } from '@/transactions/schemas';

export function TransactionsNestedRepository(): TransactionsRepository {
	const baseUrl = envVariables.VITE_APP_API_URL + 'transfer';
	return {
		findTransactions: async (
			cardId,
			pagination = {
				page: 1,
				limit: 10
			}
		) => {
			const accessToken = useAuthStore.getState().accessToken;

			const params = new URLSearchParams();
			params.append('page', pagination.page.toString());
			params.append('limit', pagination.limit.toString());

			const response = await fetch(baseUrl + `/${cardId}?${params}`, {
				method: httpReq.get,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
					Accept: 'application/json'
				}
			});

			const result = await response.json();
			if (!response.ok) {
				throw result;
			}
			console.log({ result });

			const resultValidated = transactionPaginatedGet.parse(result);
			console.log({ resultValidated });

			return resultValidated.data.map(transactionEndpointToModel);
		}
	};
}
