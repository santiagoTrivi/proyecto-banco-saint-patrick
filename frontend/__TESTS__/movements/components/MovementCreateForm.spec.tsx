import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { useAuthStore } from '@/auth/state';
import { Card as CardModel } from '@/cards/domain';
import { currencyListStub } from '@/currencies/services';
import { MovementCreateForm } from '@/movements/components';
import { MovementType } from '@/movements/domain';
import { movementsStubRepository } from '@/movements/services';
import { movementTestId } from '@/movements/utils';
import { cardStub2 } from '@/tests/cards/fixtures';
import { userStub1 } from '@/tests/users';
import { AppWrapper } from '@/tests/utils';

describe('<MovementCreateForm />', () => {
	beforeEach(() => {
		useAuthStore.setState({
			accessToken: userStub1.username,
			user: userStub1,
			card: userStub1.cardList[0] as CardModel
		});
	});

	it('should create a deposit movement', async () => {
		// GIVEN
		render(
			<MovementCreateForm
				movementsRepository={movementsStubRepository()}
				currencyList={currencyListStub}
			/>,
			{ wrapper: AppWrapper() }
		);

		// WHEN
		const typeSelect = screen.getByPlaceholderText(/Type/i);
		const amountInput = screen.getByPlaceholderText(/Amount/i);
		const conceptInput = screen.getByPlaceholderText(/Concept/i);
		const pinInput = screen.getByPlaceholderText(/PIN/i);
		const submitButton = screen.getByRole('button', { name: /Create/i });

		fireEvent.change(typeSelect, { target: { value: MovementType.DEPOSIT } });
		fireEvent.change(amountInput, { target: { value: '1000' } });
		fireEvent.change(conceptInput, { target: { value: 'Test' } });
		fireEvent.change(pinInput, { target: { value: '1234' } });

		await waitFor(() => {
			expect(typeSelect).toHaveValue(MovementType.DEPOSIT);
			expect(amountInput).toHaveValue(1000);
			expect(conceptInput).toHaveValue('Test');
			expect(pinInput).toHaveValue('1234');
		});

		expect(
			await screen.findByRole('button', { name: /Create/i })
		).not.toBeDisabled();

		fireEvent.click(submitButton);

		// THEN
		expect(await screen.findByRole('alert')).toHaveTextContent(
			/Movement created/i
		);
	});

	it('should create a transfer movement', async () => {
		// GIVEN
		const cardReceiver = cardStub2;
		render(
			<MovementCreateForm
				movementsRepository={movementsStubRepository()}
				currencyList={currencyListStub}
			/>,
			{ wrapper: AppWrapper() }
		);

		// WHEN
		const typeSelect = screen.getByPlaceholderText(/Type/i);
		fireEvent.change(typeSelect, {
			target: { value: MovementType.TRANSFERENCE }
		});

		await waitFor(() => {
			expect(typeSelect).toHaveValue(MovementType.TRANSFERENCE);
		});

		const amountInput = screen.getByPlaceholderText(/Amount/i);
		const conceptInput = screen.getByPlaceholderText(/Concept/i);
		const pinInput = screen.getByPlaceholderText(/PIN/i);
		const toCardInput = await screen.findByPlaceholderText(/To Card/i);
		const submitButton = screen.getByRole('button', { name: /Create/i });

		fireEvent.change(amountInput, { target: { value: '100' } });
		fireEvent.change(conceptInput, { target: { value: 'Test' } });
		fireEvent.change(pinInput, { target: { value: '1234' } });
		fireEvent.change(toCardInput, {
			target: { value: cardReceiver.cardNumber.value }
		});

		await waitFor(() => {
			expect(amountInput).toHaveValue(100);
			expect(conceptInput).toHaveValue('Test');
			expect(pinInput).toHaveValue('1234');
			expect(toCardInput).toHaveValue(cardReceiver.cardNumber.value);
		});

		expect(
			await screen.findByRole('button', { name: /Create/i })
		).not.toBeDisabled();

		fireEvent.click(submitButton);

		// THEN
		expect(await screen.findByRole('alert')).toHaveTextContent(
			/Movement created/i
		);
	});

	it('should show an error when type is not selected', async () => {
		// GIVEN
		render(
			<MovementCreateForm
				movementsRepository={movementsStubRepository()}
				currencyList={currencyListStub}
			/>,
			{ wrapper: AppWrapper() }
		);

		// WHEN
		const typeSelect = screen.getByPlaceholderText(
			/Type/i
		) as HTMLSelectElement;

		fireEvent.change(typeSelect, { target: { value: '' } });
		fireEvent.blur(typeSelect);

		await waitFor(() => expect(typeSelect.value).toBe(''));

		// // THEN
		expect(
			screen.getByTestId(movementTestId.movementTypeError)
		).toHaveTextContent(/You should select a movement type/i);
	});

	it('should show an error when amount is not valid', async () => {
		// GIVEN
		render(
			<MovementCreateForm
				movementsRepository={movementsStubRepository()}
				currencyList={currencyListStub}
			/>,
			{ wrapper: AppWrapper() }
		);

		// WHEN
		const amountInput = screen.getByPlaceholderText(/Amount/i);
		fireEvent.change(amountInput, { target: { value: '0' } });
		fireEvent.blur(amountInput);

		await waitFor(() => expect(amountInput).toHaveDisplayValue('0'));

		// // THEN
		expect(
			screen.getByTestId(movementTestId.movementAmountError)
		).toHaveTextContent(/You should enter an amount greater than 0/i);
	});

	it('should show an error when card number is not valid', async () => {
		// GIVEN
		render(
			<MovementCreateForm
				movementsRepository={movementsStubRepository()}
				currencyList={currencyListStub}
			/>,
			{ wrapper: AppWrapper() }
		);

		// WHEN
		const cardSelect = screen.getByPlaceholderText(
			/Card/i
		) as HTMLSelectElement;
		fireEvent.change(cardSelect, { target: { value: '' } });
		fireEvent.blur(cardSelect);

		await waitFor(() => expect(cardSelect.value).toBe(''));

		// THEN
		expect(
			screen.getByTestId(movementTestId.movementCardError)
		).toHaveTextContent(/You should select a card/i);
	});

	it('should show an error when PIN is not valid', async () => {
		// GIVEN
		render(
			<MovementCreateForm
				movementsRepository={movementsStubRepository()}
				currencyList={currencyListStub}
			/>,
			{ wrapper: AppWrapper() }
		);

		// WHEN
		const pinInput = screen.getByPlaceholderText(/PIN/i);
		fireEvent.change(pinInput, { target: { value: '123' } });
		fireEvent.blur(pinInput);

		await waitFor(() => expect(pinInput).toHaveDisplayValue('123'));

		// THEN
		expect(
			screen.getByTestId(movementTestId.movementPINError)
		).toHaveTextContent(/You should enter a 4 digit PIN/i);
	});

	it('should show an error when to card number is not valid', async () => {
		// GIVEN
		render(
			<MovementCreateForm
				movementsRepository={movementsStubRepository()}
				currencyList={currencyListStub}
			/>,
			{ wrapper: AppWrapper() }
		);

		// WHEN
		const typeSelect = screen.getByPlaceholderText(/Type/i);
		fireEvent.change(typeSelect, {
			target: { value: MovementType.TRANSFERENCE }
		});

		await waitFor(() => {
			expect(typeSelect).toHaveValue(MovementType.TRANSFERENCE);
		});

		const toCardInput = await screen.findByPlaceholderText(/To Card/i);
		fireEvent.change(toCardInput, { target: { value: '' } });
		fireEvent.blur(toCardInput);

		await waitFor(() => expect(toCardInput).toHaveDisplayValue(''));

		// THEN
		expect(
			screen.getByTestId(movementTestId.movementToCardError)
		).toHaveTextContent(/You should enter a 16 digit card number/i);
	});
});
