import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Token } from '@/auth/domain';
import { Card } from '@/cards/domain';
import { User } from '@/users/domain';

interface AuthStore {
	user?: User;
	card?: Card;
	accessToken?: string;
	isAuthenticated: boolean;
	isLogged: boolean;
	setAccessToken: (accessToken: Token['accessToken']) => void;
	setCard: (card: User) => void;
	logout: () => void;
}

export const useAuthStore = create(
	devtools<AuthStore>(
		(set) => ({
			card: undefined,
			user: undefined,
			accessToken: undefined,
			isAuthenticated: false,
			isLogged: false,
			setAccessToken: (accessToken: string) =>
				set({ accessToken, isAuthenticated: true }),
			setCard: (user: User) => set({ user: user, card: user.cardList[0] }),
			logout: () =>
				set({ accessToken: undefined, isAuthenticated: false, isLogged: false })
		}),
		{ name: '[AUTH_STORE]' }
	)
);

export function useAuthenticatedStore() {
	const state = useAuthStore((state) => ({
		card: state.card as Card,
		user: state.user as User,
		accessToken: state.accessToken
	}));

	if (!state.accessToken || !state.card || !state.user) {
		throw new Error('Should be authenticated to use this hook');
	}

	return state;
}
