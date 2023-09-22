import { Navigate, Route, Routes } from 'react-router-dom';

import { useCloseSessionOnInactivity } from '@/shared/hooks';
import { webRoutes } from '@/shared/utils';
import { HomePage, TransactionsPage } from '@/src/pages';

type PrivateRouterProps = {
	isAuthenticated: boolean;
};

export function PrivateRouter({ isAuthenticated }: PrivateRouterProps) {
	const { isLoggingOut } = useCloseSessionOnInactivity();

	if (isLoggingOut) {
		return <Navigate to={webRoutes.auth.closedSession.absolute} />;
	}

	if (!isAuthenticated) {
		return <Navigate to={webRoutes.auth.login.absolute} />;
	}

	return (
		<Routes>
			<Route path={webRoutes.root} element={<HomePage />} />
			<Route
				path={webRoutes.transactions.root}
				element={<TransactionsPage />}
			/>
		</Routes>
	);
}
