import { render, screen } from '@testing-library/react';

import { LoginPage } from '@/src/pages';
import { AppWrapper } from '@/tests/utils';

describe('<HomePage />', () => {
	it('should contain a heading', () => {
		// GIVEN
		render(<LoginPage />, { wrapper: AppWrapper() });

		// WHEN
		const heading = screen.getByText(/Saint Patrick Bank/i);

		// THEN
		expect(heading).toBeInTheDocument();
	});

	it('should contain a login form', () => {
		// GIVEN
		render(<LoginPage />, { wrapper: AppWrapper() });

		// WHEN
		const loginForm = screen.getByRole('form');

		// THEN
		expect(loginForm).toBeInTheDocument();
	});

	it('should contain a logo', () => {
		// GIVEN
		render(<LoginPage />, { wrapper: AppWrapper() });

		// WHEN
		const logo = screen.getByRole('img');

		// THEN
		expect(logo).toBeInTheDocument();
	});
});
