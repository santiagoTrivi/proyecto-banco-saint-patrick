import { render, screen } from '@testing-library/react';

import { RegisterPage } from '@/src/pages';
import { AppWrapper } from '@/tests/utils';

describe('<RegisterPage />', () => {
	it('should contain a heading', () => {
		// GIVEN
		render(<RegisterPage />, { wrapper: AppWrapper() });

		// WHEN
		const heading = screen.getByText(/Saint Patrick Bank/i);

		// THEN
		expect(heading).toBeInTheDocument();
	});

	it('should contain a logo', () => {
		// GIVEN
		render(<RegisterPage />, { wrapper: AppWrapper() });

		// WHEN
		const logo = screen.getByRole('img');

		// THEN
		expect(logo).toBeInTheDocument();
	});

	it('should contain a login form', () => {
		// GIVEN
		render(<RegisterPage />, { wrapper: AppWrapper() });

		// WHEN
		const loginForm = screen.getByRole('form');

		// THEN
		expect(loginForm).toBeInTheDocument();
	});
});
