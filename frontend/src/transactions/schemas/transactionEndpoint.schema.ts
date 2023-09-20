import { z } from 'zod';

export const transactionEndpoint = z.object({
	_id: z.string(),
	clientId: z.string(),
	senderId: z.string(),
	receiverId: z.string(),
	amount: z.number(),
	currency: z.string(),
	concept: z.string(),
	createdAt: z
		.string()
		.datetime()
		.transform((date) => new Date(date)),
	updatedAt: z
		.string()
		.datetime()
		.transform((date) => new Date(date))
});

export type TransactionEndpoint = z.infer<typeof transactionEndpoint>;

export const transactionEndpointList = z.array(transactionEndpoint);

export type TransactionEndpointList = z.infer<typeof transactionEndpointList>;

export const transactionPaginatedGet = z.object({
	data: transactionEndpointList,
	totalPages: z.number(),
	totalItems: z.number(),
	currentPage: z.string()
});
