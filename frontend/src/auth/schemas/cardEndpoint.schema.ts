import { currencyEndpoint } from '@/currencies/schemas';
import { z } from 'zod';

export const cardEndpoint = z.object({
	_id: z.string(),
	card_number: z.string().length(16),
	current_balance: z.number().positive(),
	isActive: z.boolean(),
	currency: currencyEndpoint
});

export type CardEndpoint = z.infer<typeof cardEndpoint>;
