import { useMutation } from '@tanstack/react-query';
import React from 'react';

import { AuthNestRepository } from '@/auth/services';
import { AuthStatus, useAuthStore } from '@/auth/state';
import { sessionKeys, sessionStorageRepository } from '@/shared/services';

export function useAuthVerifier(authRepository = AuthNestRepository()) {
	const authStatus = useAuthStore((state) => state.authStatus);
	const clear = useAuthStore((state) => state.clearStore);
	const setAccessToken = useAuthStore((state) => state.setAccessToken);
	const setUser = useAuthStore((state) => state.setUser);
	const changeStatus = useAuthStore((state) => state.changeStatus);
	const refreshToken = sessionStorageRepository.getItem(
		sessionKeys.REFRESH_TOKEN
	);

	const { mutate: refreshSessionMut } = useMutation(async () => {
		const { accessToken } = await authRepository.refreshSession();
		setAccessToken(accessToken);
	});

	React.useEffect(() => {
		if (authStatus === AuthStatus.INIT && refreshToken) {
			refreshSessionMut();
		} else if (authStatus === AuthStatus.INIT) {
			changeStatus(AuthStatus.IDLE);
		}
	}, [authStatus, changeStatus, refreshSessionMut, refreshToken]);

	React.useEffect(() => {
		const unsubscribe = useAuthStore.subscribe(async (state) => {
			if (state.accessToken && state.authStatus === AuthStatus.LOADING) {
				const u = await AuthNestRepository().clientInfo();
				setUser(u);
			}

			if (state.authStatus === AuthStatus.LOGGING_OUT) {
				await AuthNestRepository().logout(state.accessToken as string);
				clear();
			}
		});

		return () => {
			unsubscribe();
		};
	}, [clear, setUser]);

	return {
		isAuthenticated: authStatus === AuthStatus.SUCCESS
	};
}
