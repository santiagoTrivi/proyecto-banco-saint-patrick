/* eslint-disable no-mixed-spaces-and-tabs */
import { currencyStub1 } from '@/currencies/services';
import { movementCreatedToEndpoint } from '@/movements/adapters';
import {
	Movement,
	MovementFactory,
	MovementType,
	MovementsRepository
} from '@/movements/domain';
import { MovementCreatedEndpoint } from '@/movements/schemas';
import { Money, PaginationResult } from '@/shared/domain';
import { cardStub1 } from '@/tests/cards/fixtures';

const movementStub1 = MovementFactory({
	type: MovementType.DEPOSIT,
	amount: Money.create({ value: 100, currencyCode: currencyStub1.code }),
	cardId: cardStub1.id,
	concept: 'Test movement',
	id: '1',
	currency: currencyStub1,
	createdAt: new Date(),
	updatedAt: new Date()
});

const movementStub2 = MovementFactory({
	type: MovementType.DEPOSIT,
	amount: Money.create({ value: 100, currencyCode: currencyStub1.code }),
	cardId: cardStub1.id,
	concept: 'Test movement',
	id: '2',
	currency: currencyStub1,
	createdAt: new Date(),
	updatedAt: new Date()
});

export function movementsStubRepository(): MovementsRepository {
	const movementInMemory: Movement[] = [movementStub1, movementStub2];

	return {
		async findMovements(cardId, criteria) {
			const pagination = criteria?.pagination;

			const limit = pagination?.limit ?? 10;
			const page = pagination?.page ?? 1;

			const totalItems = movementInMemory.length;
			const totalPages = Math.ceil(totalItems / limit);

			const items = movementInMemory
				.filter((movement) => movement.cardId === cardId)
				.slice((page - 1) * limit, page * limit);

			return PaginationResult.create(items, totalItems, totalPages);
		},
		async create(movement) {
			const movementCreate: MovementCreatedEndpoint =
				movement.type === MovementType.DEPOSIT
					? {
							...movement,
							_id: movementInMemory.length.toString(),
							currencyId: currencyStub1.id,
							createdAt: new Date(),
							updatedAt: new Date()
					  }
					: {
							...movement,
							_id: movementInMemory.length.toString(),
							currencyId: currencyStub1.id,
							createdAt: new Date(),
							updatedAt: new Date(),
							type: MovementType.TRANSFERENCE,
							toCardId: '1'
					  };

			const m = movementCreatedToEndpoint(movementCreate, currencyStub1);

			movementInMemory.push(m);

			return m;
		}
	};
}
