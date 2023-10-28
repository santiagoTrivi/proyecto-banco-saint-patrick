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
import { Pagination, PaginationResult } from '@/shared/domain';
import { envVariables, formatBearerToken, httpReq } from '@/shared/utils';

export function MovementsNestRepository(): MovementsRepository {
	const baseUrl = envVariables.API_URL + 'movement';

	return {
		async findMovements(cardId, criteria) {
			const accessToken = useAuthStore.getState().accessToken;
			const pagination = criteria?.pagination ?? Pagination.default();
			const movementFilter = criteria?.movementFilter;

			const params = new URLSearchParams();
			params.append('page', pagination.page.toString());
			params.append('limit', pagination.limit.toString());
			params.append('from', movementFilter?.from?.toISOString() ?? '');
			params.append('until', movementFilter?.until?.toISOString() ?? '');

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
			return PaginationResult.create(
				resultValidated.data.map(movementEndpointToModel),
				resultValidated.totalItems,
				resultValidated.totalPages
			);
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
