import { act, render, screen } from '@testing-library/react';

import { Card, CardSelector } from '@/cards/components';
import { Card as CardModel } from '@/cards/domain';
import { userStub1 } from '@/tests/users';
import { AppWrapper } from '@/tests/utils';

describe('<Card />', () => {
	it('should not render the card balance', () => {
		// GIVEN
		const card = userStub1.cardList[0] as CardModel;

		render(
			<Card
				card={card}
				cardSelector={
					<CardSelector
						card={card}
						cardList={userStub1.cardList}
						onChange={() => {}}
					/>
				}
			/>,
			{ wrapper: AppWrapper() }
		);

		// WHEN
		const element = screen.getByText(card.balanceHidden());

		// THEN
		expect(element).toBeInTheDocument();
	});

	it('should render the card balance', async () => {
		// GIVEN
		const card = userStub1.cardList[0] as CardModel;

		render(
			<Card
				card={card}
				cardSelector={
					<CardSelector
						card={card}
						cardList={userStub1.cardList}
						onChange={() => {}}
					/>
				}
			/>,
			{ wrapper: AppWrapper() }
		);
		const button = screen.getByText('Show');
		const element = screen.getByText(card.balanceHidden());

		// WHEN
		act(() => {
			button.click();
		});

		// THEN
		expect(element).toHaveTextContent(card.balance.format());
	});

	it('should render the card selector', () => {
		// GIVEN
		const card = userStub1.cardList[0] as CardModel;

		render(
			<Card
				card={card}
				cardSelector={
					<CardSelector
						card={card}
						cardList={userStub1.cardList}
						onChange={() => {}}
					/>
				}
			/>,
			{ wrapper: AppWrapper() }
		);

		// WHEN
		const element = screen.getByText(card.cardNumber.format());

		// THEN
		expect(element).toBeInTheDocument();
	});

	it('should render the movement link', () => {
		// GIVEN
		const card = userStub1.cardList[0] as CardModel;

		render(
			<Card
				card={card}
				cardSelector={
					<CardSelector
						card={card}
						cardList={userStub1.cardList}
						onChange={() => {}}
					/>
				}
			/>,
			{ wrapper: AppWrapper() }
		);

		// WHEN
		const element = screen.getByText('Movements');

		// THEN
		expect(element).toBeInTheDocument();
	});

	it('should render the username', () => {
		// GIVEN
		const card = userStub1.cardList[0] as CardModel;

		render(
			<Card
				card={card}
				cardSelector={
					<CardSelector
						card={card}
						cardList={userStub1.cardList}
						onChange={() => {}}
					/>
				}
			/>,
			{ wrapper: AppWrapper() }
		);

		// WHEN
		const element = screen.getByText(userStub1.username);

		// THEN
		expect(element).toBeInTheDocument();
	});

	it('should render the card status', () => {
		// GIVEN
		const card = userStub1.cardList[0] as CardModel;

		render(
			<Card
				card={card}
				cardSelector={
					<CardSelector
						card={card}
						cardList={userStub1.cardList}
						onChange={() => {}}
					/>
				}
			/>,
			{ wrapper: AppWrapper() }
		);

		// WHEN
		const element = screen.getByText(/✅/i);

		// THEN
		expect(element).toBeInTheDocument();
	});
});
