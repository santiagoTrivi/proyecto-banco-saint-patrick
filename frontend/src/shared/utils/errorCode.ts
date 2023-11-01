interface ObjectWithMessage {
	message: string;
}

export function hasMessage(error: unknown): error is ObjectWithMessage {
	return (error as ObjectWithMessage).message !== undefined;
}

export const errorCode = new Map([
	['USERNAME_ALREADY_REGISTERED', 'Username already in use']
]);

export const getErrorMessage = (
	error: unknown,
	defaultMessage = 'Something went wrong'
) => {
	return hasMessage(error) ? errorCode.get(error.message) : defaultMessage;
};
