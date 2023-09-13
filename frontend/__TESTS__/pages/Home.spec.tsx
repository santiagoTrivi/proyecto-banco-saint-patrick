import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useAuthStore } from '@/auth/state';
import { HomePage } from '@/src/pages';
import { AppWrapper } from '@/tests/utils';

describe('Home', () => {
	beforeEach(() => {
		useAuthStore.setState({
			accessToken: '123',
			user: {
				firstName: '123',
				lastName: '123',
				username: '123',
				id: '123',
				isActive: true,
				cardList: [
					{
						balance: 123,
						balanceFormatted: '123',
						cardNumber: '123',
						cardNumberFormatted: '123',
						username: '123',
						id: '123',
						isActive: true
					}
				]
			},
			card: {
				balance: 123,
				balanceFormatted: '123',
				cardNumber: '123',
				cardNumberFormatted: '123',
				username: '123',
				id: '123',
				isActive: true
			},
			isAuthenticated: true,
			isLogged: true
		});
	});

	it('should contain a heading', () => {
		render(<HomePage />, { wrapper: AppWrapper() });

		const heading = screen.getByText('Lastest Movements');

		expect(heading).toBeInTheDocument();
	});
});
