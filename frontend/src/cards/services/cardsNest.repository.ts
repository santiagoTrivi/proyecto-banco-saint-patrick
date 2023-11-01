import { CardRepository } from '@/cards/domain';
import { envVariables, formatBearerToken, httpReq } from '@/shared/utils';

export function CardsNestRepository(): CardRepository {
	const baseUrl = envVariables.API_URL + 'card';
	return {
		create: async (cardCreate, accessToken = '') => {
			await fetch(baseUrl, {
				method: httpReq.post,
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json',
					Authorization: formatBearerToken(accessToken)
				},
				body: JSON.stringify(cardCreate)
			});
		}
	};
}
