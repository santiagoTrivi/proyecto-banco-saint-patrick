import { z } from 'zod';

export const cardCreate = z.object({
	PIN: z.string().min(4).max(4),
	currencyId: z.string().uuid()
});
