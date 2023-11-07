import { z } from 'zod';

export const cardCreate = z.object({
	PIN: z.string().length(4, 'PIN must be exactly 4 characters long'),
	currencyId: z.string().nonempty('Currency must be selected')
});

export type CardCreate = z.infer<typeof cardCreate>;