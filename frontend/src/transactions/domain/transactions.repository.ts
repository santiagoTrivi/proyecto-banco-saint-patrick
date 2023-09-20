import { Card } from '@/cards/domain';
import { Pagination } from '@/shared/domain';
import { Transaction } from './transaction.model';

export interface TransactionsRepository {
	findTransactions(
		cardId: Card['id'],
		pagination?: Pagination
	): Promise<Transaction[]>;
}
