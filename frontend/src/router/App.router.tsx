import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useAuthVerifier } from '@/auth/hooks';
import { webRoutes } from '@/src/shared/utils';
import { AuthRouter } from './Auth.router';
import { PrivateRouter } from './Private.router';

export const AppRouter = () => {
	const { isIdle, isLoading, isAuthenticated } = useAuthVerifier();

	if (isIdle) {
		return (
			<div className="fixed flex flex-col min-h-screen min-w-full items-center justify-center bg-bg1">
				<div>🔃</div>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="fixed flex flex-col min-h-screen min-w-full items-center justify-center bg-bg1">
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
