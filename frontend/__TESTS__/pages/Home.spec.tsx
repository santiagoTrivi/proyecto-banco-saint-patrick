import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useAuthStore } from '@/auth/state';
import { Card } from '@/cards/components';
import { Card as CardModel } from '@/cards/domain';
import { movementsStubRepository } from '@/movements/services';
import { HomePage } from '@/src/pages';
import { userStub1 } from '@/tests/users';
import { AppWrapper } from '@/tests/utils';
import { UserCard } from '@/users/components';

describe('Home', () => {
	beforeEach(() => {
		useAuthStore.setState({
			accessToken: userStub1.username,
			user: userStub1,
			card: userStub1.cardList[0] as CardModel
		});
	});

	it('should contain a heading', () => {
		// GIVEN
		render(<HomePage />, { wrapper: AppWrapper() });

		// WHEN
		const heading = screen.getByText(/SAINT PATRICK BANK/i);

		// THEN
		expect(heading).toBeInTheDocument();
	});

	it('should contain a <UserCard />', () => {
		// GIVEN
		render(<HomePage />, { wrapper: AppWrapper() });

		// WHEN
		const userCard = screen.getByTestId(UserCard.testId);

		// THEN
		expect(userCard).toBeInTheDocument();
	});

	it('should contain a card', () => {
		// GIVEN
		render(<HomePage />, { wrapper: AppWrapper() });

		// WHEN
		const card = screen.getByTestId(Card.testId);

		// THEN
		expect(card).toBeInTheDocument();
	});

	it('should contain a recent movements heading', () => {
		// GIVEN
		render(<HomePage />, { wrapper: AppWrapper() });

		// WHEN
		const heading = screen.getByText(/Recent Movements/i);

		// THEN
		expect(heading).toBeInTheDocument();
	});

	it('should contain a recent movements list', async () => {
		// GIVEN
		render(<HomePage movementRepository={movementsStubRepository()} />, {
			wrapper: AppWrapper()
		});

		// WHEN
    const main = await screen.findByRole('main');
		const movementList = within(main).getByRole('list');
		const movementListItems =
			await within(movementList).findAllByRole('button');

		// THEN;
		expect(movementListItems).toHaveLength(2);
	});
});
