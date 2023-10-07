import { currencyStub1 } from '@/currencies/services';
import {
	Movement,
	MovementFactory,
	MovementType,
	MovementsRepository
} from '@/movements/domain';
import { Money } from '@/shared/domain';
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

export function movementsStubRepository(): MovementsRepository {
	const movementInMemory: Movement[] = [movementStub1];

	return {
		async findMovements(cardId) {
			return movementInMemory.filter((movement) => movement.cardId === cardId);
		},
		async create(movement) {
			const movementCreated = MovementFactory({
				...movement,
				id: movementInMemory.length.toString()
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} as any);

			movementInMemory.push(movementCreated);

			return movementCreated;
		}
	};
}
