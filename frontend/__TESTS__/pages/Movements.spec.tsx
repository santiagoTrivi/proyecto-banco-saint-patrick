import { render, screen, within } from '@testing-library/react';

import { useAuthStore } from '@/auth/state';
import { movementsStubRepository } from '@/movements/services';
import { MovementsPage } from '@/src/pages';
import { cardStub1 } from '@/tests/cards/fixtures';
import { userStub1 } from '@/tests/users';
import { AppWrapper } from '@/tests/utils';

describe('<MovementsPage />', () => {
	beforeEach(() => {
		useAuthStore.setState({
			accessToken: userStub1.username,
			user: userStub1,
			card: cardStub1
		});
	});

	it('should render the page title', () => {
		// GIVEN
		render(<MovementsPage movementsRepository={movementsStubRepository()} />, {
			wrapper: AppWrapper()
		});

		// WHEN
		const pageTitle = screen.getByRole('heading', { name: /Movements/i });

		// THEN
		expect(pageTitle).toBeInTheDocument();
	});

	it('should render the filters', () => {
		// GIVEN
		render(<MovementsPage movementsRepository={movementsStubRepository()} />, {
			wrapper: AppWrapper()
		});

		// WHEN
		const filters = screen
			.getByText(/filter/i)
			.closest('fieldset') as HTMLFieldSetElement;

		// THEN
		expect(filters).toBeInTheDocument();
	});

	it('should render a link to create a new movement', () => {
		// GIVEN
		render(<MovementsPage movementsRepository={movementsStubRepository()} />, {
			wrapper: AppWrapper()
		});

		// WHEN
		const link = screen.getByRole('link', { name: 'Movement' });

		// THEN
		expect(link).toBeInTheDocument();
	});

	it('should render the pagination', () => {
		// GIVEN
		render(<MovementsPage movementsRepository={movementsStubRepository()} />, {
			wrapper: AppWrapper()
		});

		// WHEN
		const pagination = screen.getAllByTestId(/pagination-filter/i);

		// THEN
		expect(pagination).toHaveLength(2);
		expect(pagination[0]).toBeInTheDocument();
		expect(pagination[1]).toBeInTheDocument();
	});

	it('should render the movements list', async () => {
		// GIVEN
		render(<MovementsPage movementsRepository={movementsStubRepository()} />, {
			wrapper: AppWrapper()
		});

		// WHEN
		const main = screen.findByRole('main');
		const movementsList = within(await main).getByRole('list');

		const movementItems = within(movementsList).getAllByRole('listitem');

		// THEN
		expect(movementsList).toBeInTheDocument();
		expect(movementItems).toHaveLength(2);
	});
});
