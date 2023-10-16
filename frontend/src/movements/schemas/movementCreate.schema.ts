import { z } from 'zod';

import { MovementType } from '@/movements/domain';
import { movementBase } from './movementBase.schema';

const movementCreateBase = movementBase
	.pick({
		concept: true
	})
	.merge(
		z.object({
			cardId: z.string().nonempty('You should select a card'),
			PIN: z.string().length(4, 'You should enter a 4 digit PIN'),
			amount: z.string().refine((value) => {
				const amount = Number(value);
				return !Number.isNaN(amount) && amount > 0;
			}, 'You should enter an amount greater than 0')
		})
	);

export const movementCreate = z.discriminatedUnion(
	'type',
	[
		z
			.object({
				type: z.literal(MovementType.DEPOSIT)
			})
			.merge(movementCreateBase),
		z
			.object({
				type: z.literal(MovementType.TRANSFERENCE),
				toCard: z.string().length(16, 'You should enter a 16 digit card number')
			})
			.merge(movementCreateBase)
	],
	{
		errorMap: (error, ctx) => {
			switch (error.code) {
				case z.ZodIssueCode.invalid_union_discriminator:
					return {
						message: 'You should select a movement type'
					};
				default:
					// fall back to default message!
					return { message: ctx.defaultError };
			}
		}
	}
);

export type MovementCreate = z.infer<typeof movementCreate>;
