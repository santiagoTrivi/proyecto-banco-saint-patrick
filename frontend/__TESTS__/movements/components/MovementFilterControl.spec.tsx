import { AppWrapper } from '@/tests/utils';
import { fireEvent, render, screen } from '@testing-library/react';

import { MovementFilterControl } from '@/movements/components';
import { cardStub1, cardStub2 } from '@/tests/cards/fixtures';

describe('<MovementFilterControl />', () => {
	const cardList = [cardStub1, cardStub2];

	it('should change the card selection', () => {
		// GIVEN
		const card = cardStub1;
		const onChangeCard = vi.fn();

		render(
			<MovementFilterControl
				cardId={card.id}
				cardList={cardList}
				onChangeCard={onChangeCard}
			/>,
			{
				wrapper: AppWrapper()
			}
		);

		// WHEN
		const cardSelect = screen.getByRole('combobox', { name: /card/i });
		fireEvent.change(cardSelect, { target: { value: card.id } });

		// THEN
		expect(onChangeCard).toBeCalledTimes(1);
		expect(onChangeCard).toHaveBeenCalledWith(card.id);
	});

	it('should change the from date selection', () => {
		// GIVEN
		const fromDate = '2021-01-01';
		const onChangeFrom = vi.fn();

		render(
			<MovementFilterControl
				cardId={cardStub1.id}
				cardList={cardList}
				onChangeFrom={onChangeFrom}
			/>,
			{
				wrapper: AppWrapper()
			}
		);

		// WHEN
		const fromDateInput = screen.getByLabelText(/from/i);
		fireEvent.change(fromDateInput, { target: { value: fromDate } });

		// THEN
		expect(onChangeFrom).toBeCalledTimes(1);
		expect(onChangeFrom).toHaveBeenCalledWith(new Date(fromDate));
	});

	it('shouldnt change the from date selection if the until date is before', () => {
		// GIVEN
		const fromDate = '2021-01-01';
		const untilDate = '2020-01-01';
		const onChangeFrom = vi.fn();

		render(
			<MovementFilterControl
				cardId={cardStub1.id}
				cardList={cardList}
				onChangeFrom={onChangeFrom}
				until={new Date(untilDate)}
			/>,
			{ wrapper: AppWrapper() }
		);

		// WHEN
		const fromDateInput = screen.getByLabelText(/from/i);
		fireEvent.change(fromDateInput, { target: { value: fromDate } });

		// THEN
		expect(onChangeFrom).toBeCalledTimes(0);
	});

	it('should change the until date selection', () => {
		// GIVEN
		const untilDate = '2021-01-01';
		const onChangeUntil = vi.fn();

		render(
			<MovementFilterControl
				cardId={cardStub1.id}
				cardList={cardList}
				onChangeUntil={onChangeUntil}
			/>,
			{
				wrapper: AppWrapper()
			}
		);

		// WHEN
		const untilDateInput = screen.getByLabelText(/until/i);
		fireEvent.change(untilDateInput, { target: { value: untilDate } });

		// THEN
		expect(onChangeUntil).toBeCalledTimes(1);
		expect(onChangeUntil).toHaveBeenCalledWith(new Date(untilDate));
	});

	it('shouldnt change the until date selection if the from date is after', () => {
		// GIVEN
		const fromDate = '2021-01-01';
		const untilDate = '2020-01-01';
		const onChangeUntil = vi.fn();

		render(
			<MovementFilterControl
				cardId={cardStub1.id}
				cardList={cardList}
				onChangeUntil={onChangeUntil}
				from={new Date(fromDate)}
			/>,
			{ wrapper: AppWrapper() }
		);

		// WHEN
		const untilDateInput = screen.getByLabelText(/until/i);
		fireEvent.change(untilDateInput, { target: { value: untilDate } });

		// THEN
		expect(onChangeUntil).toBeCalledTimes(0);
	});

	it('should reset the filter', () => {
		// GIVEN
		const onChangeCard = vi.fn();
		const onChangeFrom = vi.fn();
		const onChangeUntil = vi.fn();

		render(
			<MovementFilterControl
				cardId={cardStub1.id}
				cardList={cardList}
				onChangeCard={onChangeCard}
				onChangeFrom={onChangeFrom}
				onChangeUntil={onChangeUntil}
			/>,
			{ wrapper: AppWrapper() }
		);

		// WHEN
		const fromDateInput = screen.getByLabelText(/from/i);
		fireEvent.change(fromDateInput, { target: { value: '2021-01-01' } });
		const untilDateInput = screen.getByLabelText(/until/i);
		fireEvent.change(untilDateInput, { target: { value: '2021-01-01' } });

		const resetButton = screen.getByRole('button', { name: /reset/i });
		fireEvent.click(resetButton);

		// THEN
		expect(onChangeCard).toBeCalledTimes(1);
		expect(onChangeCard).toHaveBeenCalledWith(cardStub1.id);
		expect(onChangeFrom).toBeCalledTimes(2);
		expect(onChangeFrom).toHaveBeenLastCalledWith(null);
		expect(onChangeUntil).toBeCalledTimes(2);
		expect(onChangeUntil).toHaveBeenLastCalledWith(null);
	});
});
