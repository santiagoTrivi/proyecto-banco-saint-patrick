import { z } from 'zod';

export const tokenEndpoint = z
	.object({
		access_token: z.string(),
		refresh_token: z.string()
	})
	.transform((obj) => {
		return {
			accessToken: obj.access_token,
			refreshToken: obj.refresh_token
		};
	});
