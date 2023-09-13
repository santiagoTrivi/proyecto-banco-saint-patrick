import { Link } from 'react-router-dom';

import { webRoutes } from '@/src/shared/utils';

export function RegisterPage() {
	return (
		<div>
			<Link to={webRoutes.root}> Home </Link>
			<Link to={webRoutes.auth.login.absolute}> Login </Link>

			<h1>Register Page</h1>
		</div>
	);
}
