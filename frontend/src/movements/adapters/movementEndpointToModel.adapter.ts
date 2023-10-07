import { Currency } from '@/currencies/domain';
import { Movement, MovementFactory, MovementType } from '@/movements/domain';
import { MovementEndpoint } from '@/movements/schemas';
import { Money } from '@/shared/domain';

export function movementEndpointToModel(m: MovementEndpoint): Movement {
	const currency = Currency.create({
		...m.currencyId,
		id: m.currencyId._id,
		flagLink: m.currencyId.flag_link
	});

	const amount = Money.create({
		value: m.amount,
		currencyCode: m.currencyId.code
	});

	if (m.type === MovementType.DEPOSIT) {
		return MovementFactory({
			id: m._id,
			cardId: m.cardId,
			type: m.type,
			amount,
			currency,
			concept: m.concept,
			createdAt: m.createdAt,
			updatedAt: m.updatedAt
		});
	}

	return MovementFactory({
		id: m._id,
		cardId: m.cardId,
		toCardId: m.toCardId,
		type: m.type,
		amount,
		currency,
		concept: m.concept,
		createdAt: m.createdAt,
		updatedAt: m.updatedAt
	});
}
