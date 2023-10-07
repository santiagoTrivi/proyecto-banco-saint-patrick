import { z } from 'zod';

import { timeStamp } from '@/shared/schemas';
import { cardEndpoint } from './cardEndpoint.schema';

export const userEndpoint = z
	.object({
		_id: z.string(),
		firstName: z.string(),
		lastName: z.string(),
		username: z.string(),
		isActive: z.boolean(),
		cards: z.array(cardEndpoint),
		refreshToken: z.string()
	})
	.merge(timeStamp);

export type UserEndpoint = z.infer<typeof userEndpoint>;
