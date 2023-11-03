import { AuthStubRepository } from '@/auth/services';
import { useAuthStore } from '@/auth/state';
import { Appbar } from '@/shared/components';
import { cardStub1 } from '@/tests/cards/fixtures';
import { userStub1 } from '@/tests/users';
import { AppWrapper } from '@/tests/utils';
import { render, screen } from '@testing-library/react';

describe('<Appbar />', () => {
	beforeEach(() => {
		useAuthStore.setState({
			accessToken: userStub1.username,
			user: userStub1,
			card: cardStub1
		});
	});

	it('should render a heading with the app name', () => {
		// GIVEN
		render(<Appbar authRepository={AuthStubRepository()} />, {
			wrapper: AppWrapper()
		});

		// WHEN
		const heading = screen.getByRole('heading', {
			name: /Saint Patrick Bank/i
		});

		// THEN
		expect(heading).toHaveTextContent(/Saint Patrick Bank/i);
	});

	it('should render a link to the home page', () => {
		// GIVEN
		render(<Appbar authRepository={AuthStubRepository()} />, {
			wrapper: AppWrapper()
		});

		// WHEN
		const link = screen.getByRole('link', { name: /Home/i });

		// THEN
		expect(link).toBeInTheDocument();
	});

	it('should render a link to the movements page', () => {
		// GIVEN
		render(<Appbar authRepository={AuthStubRepository()} />, {
			wrapper: AppWrapper()
		});

		// WHEN
		const link = screen.getByRole('link', { name: /Movements/i });

		// THEN
		expect(link).toBeInTheDocument();
	});

	it('should render a button to logout', () => {
		// GIVEN
		render(<Appbar authRepository={AuthStubRepository()} />, {
			wrapper: AppWrapper()
		});

		// WHEN
		const button = screen.getByRole('button', { name: /Logout/i });

		// THEN
		expect(button).toBeInTheDocument();
	});
});
