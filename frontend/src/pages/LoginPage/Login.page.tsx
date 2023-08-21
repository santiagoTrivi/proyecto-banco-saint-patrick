import { Link } from 'react-router-dom';

export const LoginPage = () => {
	return (
		<div>
			<Link to={'/'}> Home </Link>
			<Link to={'/auth/register'}> Register </Link>

			<h1>Login Page</h1>
		</div>
	);
};
