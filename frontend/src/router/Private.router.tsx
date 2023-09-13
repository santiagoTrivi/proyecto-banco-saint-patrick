import { Route, Routes, useNavigate } from 'react-router-dom';

import { webRoutes } from '@/shared/utils';

import { HomePage } from '@/src/pages';
import React from 'react';

type PrivateRouterProps = {
	isAuthenticated: boolean;
};

export function PrivateRouter({ isAuthenticated }: PrivateRouterProps) {
	const navigate = useNavigate();

	React.useEffect(() => {
		if (!isAuthenticated) {
			navigate(webRoutes.auth.login.absolute);
		}
	}, [isAuthenticated, navigate]);

	if (!isAuthenticated) {
		return null;
	}

	return (
		<Routes>
			<Route path={webRoutes.root} element={<HomePage />} />
		</Routes>
	);
}
