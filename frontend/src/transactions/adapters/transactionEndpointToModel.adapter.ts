import { Transaction } from '@/transactions/domain';
import { TransactionEndpoint } from '@/transactions/schemas';

export function transactionEndpointToModel(
	te: TransactionEndpoint
): Transaction {
	return {
		id: te._id,
		clientId: te.clientId,
		senderId: te.senderId,
		receiverId: te.receiverId,
		amount: te.amount,
		currency: te.currency,
		concept: te.concept,
		createdAt: te.createdAt,
		updatedAt: te.updatedAt
	};
}
