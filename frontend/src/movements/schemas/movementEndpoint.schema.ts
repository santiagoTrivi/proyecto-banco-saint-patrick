import { z } from 'zod';

import { MovementType } from '@/movements/domain';
import { movementBase } from './movementBase.schema';

export const movementEndpoint = z.discriminatedUnion('type', [
	z.object({ type: z.literal(MovementType.DEPOSIT) }).merge(movementBase),
	z
		.object({
			type: z.literal(MovementType.TRANSFERENCE),
			toCardId: z.string()
		})
		.merge(movementBase)
]);

export type MovementEndpoint = z.infer<typeof movementEndpoint>;

export const movementEndpointList = z.array(movementEndpoint);

export type MovementEndpointList = z.infer<typeof movementEndpointList>;

export const movementPaginatedGet = z.object({
	data: movementEndpointList,
	totalPages: z.number(),
	totalItems: z.number(),
	currentPage: z.string()
});
