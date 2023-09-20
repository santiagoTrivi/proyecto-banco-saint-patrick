import React from 'react';

import { AuthNestRepository } from '@/auth/services';
import { AuthStatus, useAuthStore } from '@/auth/state';

export function useCloseSessionOnInactivity(timeout: number = 15000) {
	const authStatus = useAuthStore((state) => state.authStatus);
	const logout = useAuthStore((state) => state.logout);
	const { accessToken } = useAuthStore();

	React.useEffect(() => {
		let timer: NodeJS.Timeout;

		const onFocused = () => {
			window.clearTimeout(timer);
		};

		const onBlurred = () => {
			timer = setTimeout(async () => {
				await AuthNestRepository().logout(accessToken || '');
				logout();
			}, timeout);
		};

		window.addEventListener('blur', onBlurred);
		window.addEventListener('focus', onFocused);

		return () => {
			window.removeEventListener('blur', onBlurred);
			window.removeEventListener('focus', onFocused);
			window.clearTimeout(timer);
		};
	}, [accessToken, logout, timeout]);

	return {
		isLoggingOut: authStatus === AuthStatus.LOGGING_OUT
	};
}
