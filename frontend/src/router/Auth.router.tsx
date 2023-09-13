import { Route, Routes, useNavigate } from 'react-router-dom';

import { LoginPage, RegisterPage } from '@/src/pages';
import { webRoutes } from '@/src/shared/utils';
import React from 'react';

type AuthRouterProps = {
	isAuthenticated: boolean;
};

export const AuthRouter = ({ isAuthenticated }: AuthRouterProps) => {
	const navigate = useNavigate();

	React.useEffect(() => {
		if (isAuthenticated) {
			navigate(webRoutes.root);
		}
	}, [isAuthenticated, navigate]);

	if (isAuthenticated) {
		return null;
	}

	return (
		<Routes>
			<Route path={webRoutes.auth.login.relative} element={<LoginPage />} />
			<Route
				path={webRoutes.auth.register.relative}
				element={<RegisterPage />}
			/>
		</Routes>
	);
};
