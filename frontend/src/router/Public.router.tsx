import { Navigate, Outlet } from 'react-router-dom';

import { webRoutes } from '@/src/shared/utils';

type PublicRouterProps = {
	isAuthenticated: boolean;
};

export const PublicRouter = ({ isAuthenticated }: PublicRouterProps) => {
	if (isAuthenticated) {
		return <Navigate to={webRoutes.root} />;
	}

	return <Outlet />;
};
