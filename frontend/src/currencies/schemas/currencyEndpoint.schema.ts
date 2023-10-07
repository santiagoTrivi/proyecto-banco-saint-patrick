import { z } from 'zod';

export const currencyEndpoint = z.object({
	_id: z.string(),
	name: z.string(),
	code: z.string(),
	symbol: z.string(),
	isAvailable: z.boolean(),
	flag_link: z.string()
});
