import { Navigate, Outlet } from 'react-router-dom';

import { webRoutes } from '@/shared/utils';

type PrivateRouterProps = {
	isAuthenticated: boolean;
};

export function PrivateRouter({ isAuthenticated }: PrivateRouterProps) {
	// const { isLoggingOut } = useCloseSessionOnInactivity();

	// if (isLoggingOut) {
	// 	return <Navigate to={webRoutes.auth.closedSession.absolute} />;
	// }

	if (!isAuthenticated) {
		return <Navigate to={webRoutes.auth.login.absolute} />;
	}

	return (
		<>
			<Outlet />
		</>
	);
}
