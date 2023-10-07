import { z } from 'zod';

export const timeStamp = z.object({
	createdAt: z.string().transform((val) => new Date(val)),
	updatedAt: z.string().transform((val) => new Date(val))
});
