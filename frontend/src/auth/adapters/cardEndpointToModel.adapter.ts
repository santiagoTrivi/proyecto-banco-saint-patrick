import { CardEndpoint } from '@/auth/schemas';
import { Card, CardNumber } from '@/cards/domain';
import { Money } from '@/shared/domain';

export function cardEndpointToModel(c: CardEndpoint): Card {
	return Card.create({
		id: c._id,
		cardNumber: CardNumber.create(c.card_number),
		balance: Money.create({
			value: c.current_balance,
			currencyCode: c.currency.code
		}),
		isActive: c.isActive
	});
}
