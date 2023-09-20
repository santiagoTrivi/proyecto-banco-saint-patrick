import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage, RegisterPage } from '@/src/pages';
import { SessionClosedPage } from '@/src/pages/SessionClosedPage';
import { webRoutes } from '@/src/shared/utils';

type AuthRouterProps = {
	isAuthenticated: boolean;
};

export const AuthRouter = ({ isAuthenticated }: AuthRouterProps) => {
	if (isAuthenticated) {
		return <Navigate to={webRoutes.root} />;
	}

	return (
		<Routes>
			<Route path={webRoutes.auth.login.relative} element={<LoginPage />} />
			<Route
				path={webRoutes.auth.register.relative}
				element={<RegisterPage />}
			/>
			<Route
				path={webRoutes.auth.closedSession.relative}
				element={<SessionClosedPage />}
			/>
		</Routes>
	);
};
