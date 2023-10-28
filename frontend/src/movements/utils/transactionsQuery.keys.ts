import { Card } from '@/cards/domain';
import { MovementFilter } from '@/movements/domain';
import { Pagination } from '@/shared/domain';

export const transactionsQueryKeys = {
	all: ['transactions'] as const,
	findTransactions: (props: {
		cardId?: Card['id'];
		pagination?: Pagination;
		movementFilter?: MovementFilter;
	}) => [
		...transactionsQueryKeys.all,
		'findTransactions',
		props.cardId,
		props.pagination?.page,
		props.pagination?.limit,
		props.movementFilter?.until,
		props.movementFilter?.from
	]
};
