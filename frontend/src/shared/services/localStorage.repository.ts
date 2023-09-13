import { LocalStorageRepository } from '@/shared/domain';

export const localKeys = {
	REFRESH_TOKEN: 'REFRESH_TOKEN'
} as const;

export type Keys = typeof localKeys;

export const localStorageRepository: LocalStorageRepository<Keys> = {
	getItem: (key) => {
		return localStorage.getItem(localKeys[key]);
	},

	setItem: (key, value) => {
		return localStorage.setItem(localKeys[key], value);
	},
	removeItem: (key) => {
		return localStorage.removeItem(localKeys[key]);
	}
};
