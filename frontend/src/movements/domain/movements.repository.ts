import { Card } from '@/cards/domain';
import { Currency } from '@/currencies/domain';
import { MovementCreate, MovementFilter } from '@/movements/domain';
import { Pagination, PaginationResult } from '@/shared/domain';
import { Movement } from './movement.model';

export interface MovementsRepository {
	findMovements(
		cardId: Card['id'],
		criteria?: { pagination?: Pagination; movementFilter?: MovementFilter }
	): Promise<PaginationResult<Movement>>;
	create(movement: MovementCreate, currencyList: Currency[]): Promise<Movement>;
}
