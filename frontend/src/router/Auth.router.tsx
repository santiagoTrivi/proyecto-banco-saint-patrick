import { Route, Routes } from 'react-router-dom';

import { LoginPage, RegisterPage } from '@/src/pages';
import { webRoutes } from '@/src/utils';

export const AuthRouter = () => {
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
