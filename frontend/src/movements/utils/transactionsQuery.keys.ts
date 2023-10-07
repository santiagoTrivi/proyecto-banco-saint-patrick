import { Card } from '@/cards/domain';

export const transactionsQueryKeys = {
	all: ['transactions'] as const,
	findTransactions: (cardId: Card['id']) => [
		...transactionsQueryKeys.all,
		'findTransactions',
		cardId
	]
};
