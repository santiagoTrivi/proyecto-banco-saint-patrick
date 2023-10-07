import { Card } from '@/cards/domain';
import { Currency } from '@/currencies/domain';
import { MovementCreate } from '@/movements/domain';
import { Pagination } from '@/shared/domain';
import { Movement } from './movement.model';

export interface MovementsRepository {
	findMovements(
		cardId: Card['id'],
		pagination?: Pagination
	): Promise<Movement[]>;
	create(movement: MovementCreate, currencyList: Currency[]): Promise<Movement>;
}
