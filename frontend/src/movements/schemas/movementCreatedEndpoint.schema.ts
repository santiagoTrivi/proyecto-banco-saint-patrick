import { z } from 'zod';

import { MovementType } from '@/movements/domain';
import { movementBase } from './movementBase.schema';

const movementCreatedBase = movementBase
	.omit({ currencyId: true })
	.merge(z.object({ currencyId: z.string() }));

export const movementCreatedEndpoint = z.discriminatedUnion('type', [
	z
		.object({ type: z.literal(MovementType.DEPOSIT) })
		.merge(movementCreatedBase),
	z
		.object({
			type: z.literal(MovementType.TRANSFERENCE),
			toCard: z.string()
		})
		.merge(movementCreatedBase)
]);

export type MovementCreatedEndpoint = z.infer<typeof movementCreatedEndpoint>;
