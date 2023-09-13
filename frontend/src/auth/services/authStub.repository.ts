import { AuthRepository, Credentials, Token } from '@/auth/domain';
import { useAuthStore } from '@/auth/state';
import { formatMoney, groupChars } from '@/shared/utils';
import { User } from '@/users/domain';

export const cardStub1: User = {
	id: '1',
	username: 'jhon',
	firstName: 'John',
	lastName: 'Doe',
	isActive: true,
	cardList: [
		{
			id: '1',
			cardNumber: '1234567890123456',
			balance: 1000,
			isActive: true,
			balanceFormatted: formatMoney(1000),
			cardNumberFormatted: groupChars('1234567890123456', 4),
			username: 'jhon'
		}
	]
};

export const credentialStub1: Credentials & Token = {
	username: cardStub1.username,
	password: '12345678',
	accessToken: '',
	refreshToken: ''
};

export const cardStub2: User = {
	id: '2',
	firstName: 'Jane',
	lastName: 'Doe',
	username: 'jane',
	isActive: true,
	cardList: [
		{
			id: '2',
			cardNumber: '1234567890123457',
			balance: 1000,
			isActive: true,
			balanceFormatted: formatMoney(1000),
			cardNumberFormatted: groupChars('1234567890123457', 4),
			username: 'jane'
		}
	]
};

export const credentialStub2: Credentials & Token = {
	username: cardStub2.username,
	password: '12345678',
	accessToken: '',
	refreshToken: ''
};

export function AuthStubRepository(): AuthRepository {
	let authInMemory: (Credentials & Token)[] = [
		credentialStub1,
		credentialStub2
	];
	const cardInMemory: User[] = [cardStub1, cardStub2];

	return {
		login: async (credentials) => {
			const cardFound = authInMemory.find(
				(auth) =>
					auth.username === credentials.username &&
					auth.password === credentials.password
			);

			if (!cardFound) {
				throw new Error('Card not found');
			}

			cardFound.accessToken = new Date().toISOString();
			cardFound.refreshToken = new Date().toISOString();

			authInMemory = authInMemory.map((auth) => {
				if (
					auth.username === credentials.username &&
					auth.password === credentials.password
				) {
					return cardFound;
				}

				return auth;
			});

			return cardFound;
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

			const authFound = authInMemory.find(
				(auth) => auth.accessToken === accessToken
			);

			if (!authFound) {
				throw new Error('Auth not found');
			}

			const card = cardInMemory.find(
				(card) => card.username === authFound.username
			);

			if (!card) {
				throw new Error('Card not found');
			}

			return card;
		},

		refreshSession: async () => {
			const accessToken = useAuthStore.getState().accessToken;

			if (!accessToken) {
				throw new Error('Access token not found');
			}

			const authFound = authInMemory.find(
				(auth) => auth.accessToken === accessToken
			);

			if (!authFound) {
				throw new Error('Auth not found');
			}

			authFound.accessToken = new Date().toISOString();
			authFound.refreshToken = new Date().toISOString();

			authInMemory = authInMemory.map((auth) => {
				if (auth.accessToken === accessToken) {
					return authFound;
				}

				return auth;
			});

			return authFound;
		}
	};
}
