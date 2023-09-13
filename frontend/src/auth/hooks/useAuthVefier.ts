import { useQuery } from '@tanstack/react-query';

import { AuthNestRepository } from '@/auth/services';
import { useAuthStore } from '@/auth/state';
import { authQueryKeys } from '@/auth/utils';
import { localKeys, localStorageRepository } from '@/shared/services';
import React, { useState } from 'react';

export enum VerifyStatus {
	IDLE = 'idle',
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error'
}

export function useAuthVerifier(authRepository = AuthNestRepository()) {
	const [verifyState, setVerifyState] = useState(VerifyStatus.IDLE);
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const accessToken = useAuthStore((state) => state.accessToken);
	const setAccessToken = useAuthStore((state) => state.setAccessToken);
	const logout = useAuthStore((state) => state.logout);
	const setCard = useAuthStore((state) => state.setCard);

	const refreshToken = localStorageRepository.getItem(localKeys.REFRESH_TOKEN);

	const {
		data: tokens,
		isSuccess: isSuccessRefreshToken,
		isError: isErrorRefreshToken
	} = useQuery(
		authQueryKeys.refreshToken(),
		() => {
			setVerifyState(VerifyStatus.LOADING);
			return authRepository.refreshSession();
		},
		{ enabled: !!refreshToken && !isAuthenticated, retry: false }
	);

	const {
		data: userInfo,
		isSuccess: isSuccessCardInfo,
		isError: isErrorCardInfo
	} = useQuery(
		authQueryKeys.cardInfo(),
		() => {
			return AuthNestRepository().clientInfo();
		},
		{ enabled: !!accessToken, retry: false }
	);

	React.useEffect(() => {
		if (!refreshToken || isErrorRefreshToken || isErrorCardInfo) {
			setVerifyState(VerifyStatus.ERROR);
			logout();
			localStorageRepository.removeItem(localKeys.REFRESH_TOKEN);
		}

		if (isSuccessRefreshToken) {
			setAccessToken(tokens?.accessToken);
		}

		if (isSuccessCardInfo) {
			setVerifyState(VerifyStatus.SUCCESS);
			setCard(userInfo);
		}
		return () => {};
	}, [
		userInfo,
		isErrorCardInfo,
		isErrorRefreshToken,
		isSuccessCardInfo,
		isSuccessRefreshToken,
		refreshToken,
		setAccessToken,
		setCard,
		tokens?.accessToken,
		logout
	]);

	return {
		isAuthenticated: VerifyStatus.SUCCESS === verifyState,
		isIdle: VerifyStatus.IDLE === verifyState,
		isLoading: VerifyStatus.LOADING === verifyState,
		isError: VerifyStatus.ERROR === verifyState
	};
}
