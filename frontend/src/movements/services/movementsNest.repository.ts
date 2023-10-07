import { useAuthStore } from '@/auth/state';
import {
	movementCreatedToEndpoint,
	movementEndpointToModel
} from '@/movements/adapters/';
import { MovementsRepository } from '@/movements/domain';
import {
	movementCreatedEndpoint,
	movementPaginatedGet
} from '@/movements/schemas';
import { envVariables, formatBearerToken, httpReq } from '@/shared/utils';

export function MovementsNestRepository(): MovementsRepository {
	const baseUrl = envVariables.API_URL + 'movement';

	return {
		async findMovements(
			cardId,
			pagination = {
				page: 1,
				limit: 10
			}
		) {
			const accessToken = useAuthStore.getState().accessToken;

			const params = new URLSearchParams();
			params.append('page', pagination.page.toString());
			params.append('limit', pagination.limit.toString());

			const response = await fetch(baseUrl + `/${cardId}?${params}`, {
				method: httpReq.get,
				headers: {
					'Content-Type': 'application/json',
					Authorization: formatBearerToken(accessToken),
					Accept: 'application/json'
				}
			});

			const result = await response.json();
			if (!response.ok) {
				throw result;
			}

			const resultValidated = movementPaginatedGet.parse(result);

			return resultValidated.data.map(movementEndpointToModel);
		},

		async create(movement, currencyList = []) {
			const accessToken = useAuthStore.getState().accessToken;
			const response = await fetch(baseUrl, {
				method: httpReq.post,
				headers: {
					'Content-Type': 'application/json',
					Authorization: formatBearerToken(accessToken),
					Accept: 'application/json'
				},
				body: JSON.stringify(movement)
			});

			const result = await response.json();

			if (!response.ok) {
				throw result;
			}

			const resultValidated = movementCreatedEndpoint.parse(result);

			const currency = currencyList.find(
				(currency) => currency.id === resultValidated.currencyId
			);

			if (!currency) {
				throw new Error('Currency not found');
			}

			return movementCreatedToEndpoint(resultValidated, currency);
		}
	};
}



