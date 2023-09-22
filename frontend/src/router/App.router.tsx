import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useAuthVerifier } from '@/auth/hooks';
import { AuthStatus, useAuthStore } from '@/auth/state';
import { webRoutes } from '@/src/shared/utils';
import { AuthRouter } from './Auth.router';
import { PrivateRouter } from './Private.router';

export const AppRouter = () => {
	const authStatus = useAuthStore((s) => s.authStatus);
	const { isAuthenticated } = useAuthVerifier();

	if (authStatus === AuthStatus.INIT || authStatus === AuthStatus.LOADING) {
		return (
			<div className="fixed flex flex-col min-h-screen min-w-full items-center justify-center bg-bg1 text-primary">
				<div>🔃 Loading...</div>
			</div>
		);
	}

	return (
		<div className="fixed flex flex-col min-h-screen min-w-full bg-bg1">
			<BrowserRouter>
				<Routes>
					<Route
						path={webRoutes.auth.root + '/*'}
						element={<AuthRouter isAuthenticated={isAuthenticated} />}
					/>
					<Route
						path={webRoutes.root + '/*'}
						element={<PrivateRouter isAuthenticated={isAuthenticated} />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
};
