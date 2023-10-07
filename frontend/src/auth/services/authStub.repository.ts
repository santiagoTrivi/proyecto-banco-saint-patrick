import { AuthRepository, Credentials } from '@/auth/domain';
import { useAuthStore } from '@/auth/state';
import { userStub1, userStub2 } from '@/tests/users';
import { User } from '@/users/domain';

export const credentialStub1: Credentials = {
	username: userStub1.username,
	password: '12345678'
};

export const credentialStub2: Credentials = {
	username: userStub2.username,
	password: '12345678'
};

export function AuthStubRepository(): AuthRepository {
	let credentialInMemory: Credentials[] = [credentialStub1, credentialStub2];
	const userInMemory: User[] = [userStub1, userStub2];

	return {
		login: async (credentials) => {
			const cardFound = credentialInMemory.find(
				(c) =>
					c.username === credentials.username &&
					c.password === credentials.password
			);

			if (!cardFound) {
				throw new Error('Card not found');
			}

			credentialInMemory = credentialInMemory.map((auth) => {
				if (
					auth.username === credentials.username &&
					auth.password === credentials.password
				) {
					return cardFound;
				}

				return auth;
			});

			return {
				accessToken: credentials.username,
				refreshToken: credentials.username
			};
		},

		logout: async (_accessToken) => {
			console.log(_accessToken);
			return;
		},

		clientInfo: async () => {
			const accessToken = useAuthStore.getState().accessToken;

			if (!accessToken) {
				throw new Error('Access token not found');
			}

			const authFound = credentialInMemory.find(
				(auth) => auth.username === accessToken
			);

			if (!authFound) {
				throw new Error('Auth not found');
			}

			const user = userInMemory.find(
				(card) => card.username === authFound.username
			);

			if (!user) {
				throw new Error('Card not found');
			}

			return user;
		},

		refreshSession: async () => {
			const accessToken = useAuthStore.getState().accessToken;

			if (!accessToken) {
				throw new Error('Access token not found');
			}

			const credential = credentialInMemory.find(
				(auth) => auth.username === accessToken
			);

			if (!credential) {
				throw new Error('Credential not found');
			}

			credentialInMemory = credentialInMemory.map((c) => {
				if (c.username === accessToken) {
					return credential;
				}

				return c;
			});

			return {
				accessToken: credential.username,
				refreshToken: credential.username
			};
		}
	};
}
