import { z } from 'zod';

import { currencyEndpoint } from '@/currencies/schemas';

export const movementBase = z.object({
	_id: z.string(),
	cardId: z.string(),
	amount: z.number(),
	concept: z.string(),
	currencyId: currencyEndpoint,
	createdAt: z
		.string()
		.datetime()
		.transform((date) => new Date(date)),
	updatedAt: z
		.string()
		.datetime()
		.transform((date) => new Date(date))
});
