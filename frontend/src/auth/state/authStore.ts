import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Token } from '@/auth/domain';
import { Card } from '@/cards/domain';
import { User } from '@/users/domain';

export enum AuthStatus {
	INIT = 'init',
	IDLE = 'idle',
	LOADING = 'loading',
	SUCCESS = 'success',
	LOGGING_OUT = 'logging_out',
	ERROR = 'error'
}

interface AuthStore {
	user: User | null;
	card: Card | null;
	accessToken: string;
	authStatus: AuthStatus;
	setAccessToken: (accessToken: Token['accessToken']) => void;
	setUser: (user: User) => void;
	changeCard: (cardId: Card['id']) => void;
	logout: () => void;
	clearStore: () => void;
	changeStatus: (status: AuthStatus) => void;
}

const initialState = {
	card: null,
	user: null,
	accessToken: '',
	authStatus: AuthStatus.INIT
} as const;

export const useAuthStore = create(
	devtools<AuthStore>(
		(set, get) => ({
			// PROPERTY
			...initialState,
			// METHOD
			setAccessToken: (accessToken: string) =>
				set({ accessToken, authStatus: AuthStatus.LOADING }),
			setUser: (user: User) =>
				set({
					user: user,
					card: user?.cardList?.[0],
					authStatus: AuthStatus.SUCCESS
				}),
			changeCard: (cardId: Card['id']) => {
				const card = get().user?.cardList.find((card) => card.id === cardId);

				if (card) {
					set({ card });
				}
			},
			logout: () => set({ authStatus: AuthStatus.LOGGING_OUT }),
			clearStore: () => set({ ...initialState, authStatus: AuthStatus.IDLE }),
			changeStatus: (authStatus: AuthStatus) => set({ authStatus })
		}),
		{ name: '[AUTH_STORE]' }
	)
);

export function useAuthenticatedStore() {
	const state = useAuthStore((state) => ({
		card: state?.card as Card,
		user: state?.user as User,
		accessToken: state?.accessToken as string
	}));

	if (!state.accessToken || !state.card || !state.user) {
		throw new Error('Should be authenticated to use this hook');
	}

	return state;
}
