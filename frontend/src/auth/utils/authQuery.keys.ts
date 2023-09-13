export const authQueryKeys = {
	all: ['auth'] as const,
	refreshToken: () => [...authQueryKeys.all, 'refreshToken'],
	cardInfo: () => [...authQueryKeys.all, 'cardInfo']
};
