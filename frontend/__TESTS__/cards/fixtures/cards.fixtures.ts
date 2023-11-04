import { Card, CardNumber } from '@/cards/domain';
import { Money } from '@/shared/domain';

export const cardStub1 = Card.create({
	id: '1',
	cardNumber: CardNumber.create('1234567890123456'),
	balance: Money.create({ value: 1000, currencyCode: 'USD' }),
	isActive: true
});

export const cardStub2 = Card.create({
	id: '2',
	cardNumber: CardNumber.create('1234567890123457'),
	balance: Money.create({ value: 1000, currencyCode: 'USD' }),
	isActive: true
});
