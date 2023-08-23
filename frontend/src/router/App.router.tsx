import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { HomePage } from '@/src/pages';
import { webRoutes } from '@/src/utils';
import { AuthRouter } from './Auth.router';

export const AppRouter = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path={webRoutes.root} element={<HomePage />} />
					<Route path={webRoutes.auth.root + '/*'} element={<AuthRouter />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};
