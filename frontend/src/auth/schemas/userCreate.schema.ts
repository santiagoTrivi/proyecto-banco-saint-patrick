import { z } from 'zod';

export const userCreate = z
	.object({
		firstName: z.string().nonempty('First name cannot be empty'),
		lastName: z.string().nonempty('Last name cannot be empty'),
		username: z
			.string()
			.nonempty('Username cannot be empty')
			.min(4, 'Username must be between 4 and 20 characters long')
			.max(20, 'Username must be between 4 and 20 characters long'),
		password: z
			.string()
			.min(8, 'Password must be between 8 and 50 characters long')
			.max(50, 'Password must be between 8 and 50 characters long'),
		confirmPassword: z.string().nonempty('Confirm password cannot be empty'),
		PIN: z.string().length(4, 'PIN must be exactly 4 characters long'),
		currencyId: z.string().nonempty('Currency must be selected')
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			return ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['confirmPassword'],
				message: 'Passwords must match'
			});
		}
	});

export type UserCreate = z.infer<typeof userCreate>;
