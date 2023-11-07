import {
	fireEvent,
	render,
	screen,
	waitFor,
	within
} from '@testing-library/react';

import { AuthStubRepository } from '@/auth/services';
import { useAuthStore } from '@/auth/state';
import { CardCreateDialog } from '@/cards/components';
import { CardsStubRepository } from '@/cards/services';
import { currencyListStub } from '@/currencies/services';
import { cardStub1 } from '@/tests/cards/fixtures';
import { userStub1 } from '@/tests/users';
import { AppWrapper } from '@/tests/utils';

describe('<CardCreateDialog />', () => {
	beforeEach(() => {
		useAuthStore.setState({
			accessToken: userStub1.username,
			user: userStub1,
			card: cardStub1
		});
	});

	it('should have a button to open the dialog', () => {
		// GIVEN
		const cardList = userStub1.cardList;
		render(
			<CardCreateDialog
				cardList={cardList}
				authRepository={AuthStubRepository()}
				cardRepository={CardsStubRepository()}
				currenciesList={currencyListStub}
			/>,
			{ wrapper: AppWrapper() }
		);

		// WHEN
		const button = screen.getByRole('button');

		// THEN
		expect(button).toBeInTheDocument();
	});

	it('should have a title', () => {
		// GIVEN
		const cardList = userStub1.cardList;

		render(
			<CardCreateDialog
				cardList={cardList}
				authRepository={AuthStubRepository()}
				cardRepository={CardsStubRepository()}
				currenciesList={currencyListStub}
			/>,
			{ wrapper: AppWrapper() }
		);
		const button = screen.getByRole('button');

		// WHEN
		fireEvent.click(button);
		const element = screen.getByRole('heading', {
			name: /Register a new card/i
		});

		// THEN
		expect(element).toBeInTheDocument();
	});

	it('should have a form', () => {
		// GIVEN
		const cardList = userStub1.cardList;

		render(
			<CardCreateDialog
				cardList={cardList}
				authRepository={AuthStubRepository()}
				cardRepository={CardsStubRepository()}
				currenciesList={currencyListStub}
			/>,
			{ wrapper: AppWrapper() }
		);
		const button = screen.getByRole('button');

		// WHEN
		fireEvent.click(button);
		const element = screen.getByRole('form');

		// THEN
		expect(element).toBeInTheDocument();
	});

	it('should register a new card', async () => {
		// GIVEN
		const cardList = userStub1.cardList;

		render(
			<CardCreateDialog
				cardList={cardList}
				authRepository={AuthStubRepository()}
				cardRepository={CardsStubRepository()}
				currenciesList={currencyListStub}
			/>,
			{ wrapper: AppWrapper() }
		);
		const button = screen.getByRole('button');
		fireEvent.click(button);
		const form = screen.getByRole('form');
		const currencySelect = within(form).getByPlaceholderText(/currency/i);
		const pinInput = within(form).getByPlaceholderText(/pin/i);

		// WHEN
		fireEvent.change(currencySelect, { target: { value: '1' } });
		fireEvent.change(pinInput, { target: { value: '1234' } });
		fireEvent.submit(form);

		// THEN
		expect(currencySelect).toHaveValue('1');
		expect(pinInput).toHaveValue('1234');

		await waitFor(async () => {
			expect(
				await screen.findByText(/card created successfully/i)
			).toBeInTheDocument();
		});
	});

	it('should show an error if currency is empty', async () => {
		// GIVEN
		const cardList = userStub1.cardList;

		render(
			<CardCreateDialog
				cardList={cardList}
				authRepository={AuthStubRepository()}
				cardRepository={CardsStubRepository()}
				currenciesList={currencyListStub}
			/>,
			{ wrapper: AppWrapper() }
		);
		const button = screen.getByRole('button');
		fireEvent.click(button);
		const form = screen.getByRole('form');
		const currencySelect = within(form).getByPlaceholderText(/currency/i);

		// WHEN
		fireEvent.change(currencySelect, { target: { value: '' } });
		fireEvent.blur(currencySelect);

		// THEN
		expect(await screen.findByText(/must be selected/i)).toBeInTheDocument();
	});

	it('should show an error if PIN is empty', async () => {
		// GIVEN
		const cardList = userStub1.cardList;

		render(
			<CardCreateDialog
				cardList={cardList}
				authRepository={AuthStubRepository()}
				cardRepository={CardsStubRepository()}
				currenciesList={currencyListStub}
			/>,
			{ wrapper: AppWrapper() }
		);
		const button = screen.getByRole('button');
		fireEvent.click(button);
		const form = screen.getByRole('form');
		const pinInput = within(form).getByPlaceholderText(/pin/i);

		// WHEN
		fireEvent.change(pinInput, { target: { value: '' } });
		fireEvent.blur(pinInput);

		// THEN
		expect(
			await screen.findByText(/PIN must be exactly 4 characters long/i)
		).toBeInTheDocument();
	});
});
