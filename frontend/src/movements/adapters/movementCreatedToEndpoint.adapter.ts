import { Currency } from '@/currencies/domain';
import { Movement, MovementFactory, MovementType } from '@/movements/domain';
import { MovementCreatedEndpoint } from '@/movements/schemas';
import { Money } from '@/shared/domain';

export function movementCreatedToEndpoint(
	m: MovementCreatedEndpoint,
	c: Currency
): Movement {
	const money = Money.create({
		value: m.amount,
		currencyCode: c.code
	});

	if (m.type === MovementType.DEPOSIT) {
		return MovementFactory({
			id: m._id,
			cardId: m.cardId,
			amount: money,
			concept: m.concept,
			currency: c,
			createdAt: m.createdAt,
			updatedAt: m.updatedAt,
			type: m.type
		});
	}

	return MovementFactory({
		id: m._id,
		cardId: m.cardId,
		amount: money,
		concept: m.concept,
		currency: c,
		createdAt: m.createdAt,
		updatedAt: m.updatedAt,
		type: m.type,
		toCardId: m.toCardId
	});
}
