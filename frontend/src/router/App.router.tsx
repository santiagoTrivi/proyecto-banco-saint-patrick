import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useAuthVerifier } from '@/auth/hooks';
import { AuthStatus, useAuthStore } from '@/auth/state';
import { webRoutes } from '@/shared/utils';
import {
	HomePage,
	LoginPage,
	MovementsNewPage,
	MovementsPage,
	RegisterPage,
	SessionClosedPage
} from '@/src/pages';
import { PrivateRouter } from './Private.router';
import { PublicRouter } from './Public.router';

export const AppRouter = () => {
	const authStatus = useAuthStore((s) => s.authStatus);
	const { isAuthenticated } = useAuthVerifier();

	if (authStatus === AuthStatus.INIT || authStatus === AuthStatus.LOADING) {
		return (
			<div className="fixed flex min-h-screen min-w-full flex-col items-center justify-center bg-bg1 text-primary">
				<div>🔃 Loading...</div>
			</div>
		);
	}

	return (
		<div className="fixed inset-0 flex min-h-full flex-col overflow-auto bg-bg1">
			<BrowserRouter>
				<Routes>
					<Route
						path={webRoutes.root}
						element={<PrivateRouter isAuthenticated={isAuthenticated} />}
					>
						<Route path={webRoutes.root} element={<HomePage />} />
					</Route>

					<Route
						path={webRoutes.movements.path}
						element={<PrivateRouter isAuthenticated={isAuthenticated} />}
					>
						<Route
							path={webRoutes.movements.root}
							element={<MovementsPage />}
						/>
						<Route
							path={webRoutes.movements.new.relative}
							element={<MovementsNewPage />}
						/>
					</Route>
					<Route
						path={webRoutes.auth.path}
						element={<PublicRouter isAuthenticated={isAuthenticated} />}
					>
						<Route
							path={webRoutes.auth.login.relative}
							element={<LoginPage />}
						/>
						<Route
							path={webRoutes.auth.register.relative}
							element={<RegisterPage />}
						/>
						<Route
							path={webRoutes.auth.closedSession.relative}
							element={<SessionClosedPage />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};
