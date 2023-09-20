import { UserEndpointToModel } from '@/auth/adapters';
import { AuthRepository } from '@/auth/domain';
import { tokenEndpoint, userEndpoint } from '@/auth/schemas';
import { useAuthStore } from '@/auth/state';
import { sessionKeys, sessionStorageRepository } from '@/shared/services';
import { envVariables, httpReq } from '@/shared/utils';

export function AuthNestRepository(): AuthRepository {
	const baseUrl = envVariables.VITE_APP_API_URL + 'auth';

	return {
		login: async (credentials) => {
			const response = await fetch(baseUrl + '/login', {
				method: httpReq.post,
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json'
				},
				body: JSON.stringify(credentials)
			});

			const result = await response.json();
			const resultValidated = tokenEndpoint.parse(result);

			return resultValidated;
		},

		refreshSession: async () => {
			const refreshToken = sessionStorageRepository.getItem(
				sessionKeys.REFRESH_TOKEN
			);

			const response = await fetch(baseUrl + '/refresh-tokens', {
				method: httpReq.post,
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json',
					Authorization: `Bearer ${refreshToken}`
				}
			});

			const result = await response.json();

			const resultValidated = tokenEndpoint.parse(result);

			sessionStorageRepository.setItem(
				sessionKeys.REFRESH_TOKEN,
				resultValidated.refreshToken
			);

			return resultValidated;
		},

		logout: async (accessToken: string) => {
			await fetch(baseUrl + '/logout', {
				method: httpReq.post,
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json',
					Authorization: `Bearer ${accessToken}`
				},
				body: JSON.stringify({ access_token: accessToken })
			});

			sessionStorageRepository.removeItem(sessionKeys.REFRESH_TOKEN);
		},

		clientInfo: async () => {
			const accessToken = useAuthStore.getState().accessToken;
			const response = await fetch(baseUrl + '/clientInfo', {
				method: httpReq.get,
				headers: {
					Authorization: `Bearer ${accessToken}`,
					accept: 'application/json'
				}
			});

			const result = await response.json();

			const resultValidated = userEndpoint.parse(result);

			return UserEndpointToModel(resultValidated);
		}
	};
}
