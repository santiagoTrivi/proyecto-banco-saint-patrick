import { StorageRepository } from '@/shared/domain';

export const sessionKeys = {
	REFRESH_TOKEN: 'REFRESH_TOKEN'
} as const;

export type Keys = typeof sessionKeys;

export type SessionStorageRepository = StorageRepository<Keys>;

export const sessionStorageRepository: SessionStorageRepository = {
	getItem: (key) => {
		return sessionStorage.getItem(sessionKeys[key]);
	},

	setItem: (key, value) => {
		return sessionStorage.setItem(sessionKeys[key], value);
	},
	removeItem: (key) => {
		return sessionStorage.removeItem(sessionKeys[key]);
	}
};
