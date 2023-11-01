import { timeStamp } from '@/shared/schemas';
import { z } from 'zod';

export const cardCreatedEndpoint = z
	.object({
		_id: z.string(),
		clientId: z.string(),
		card_number: z.string().length(16),
		current_balance: z.number().min(0).nonnegative(),
		currency: z.string(),
		isActive: z.boolean()
	})
	.merge(timeStamp);
