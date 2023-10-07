import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useAuthVerifier } from '@/auth/hooks';
import { AuthStatus, useAuthStore } from '@/auth/state';
import { webRoutes } from '@/shared/utils';
import {
	HomePage,
	LoginPage,
	RegisterPage,
	SessionClosedPage,
	TransactionsNewPage,
	TransactionsPage
} from '@/src/pages';
import { PrivateRouter } from './Private.router';
import { PublicRouter } from './Public.router';

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
		<div className="bg-bg1 flex flex-col fixed inset-0 overflow-auto">
			<BrowserRouter>
				<Routes>
					<Route
						path={webRoutes.root}
						element={<PrivateRouter isAuthenticated={isAuthenticated} />}
					>
						<Route path={webRoutes.root} element={<HomePage />} />
					</Route>

					<Route
						path={webRoutes.transactions.path}
						element={<PrivateRouter isAuthenticated={isAuthenticated} />}
					>
						<Route
							path={webRoutes.transactions.path}
							element={<TransactionsPage />}
						/>
						<Route
							path={webRoutes.transactions.new.relative}
							element={<TransactionsNewPage />}
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
