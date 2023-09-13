import { z } from 'zod';

export const credentials = z.object({
	username: z.string().min(4).max(16),
	password: z.string().min(8).max(50)
});

export type Credentials = z.infer<typeof credentials>;
