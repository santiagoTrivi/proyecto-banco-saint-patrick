import { useMutation } from '@tanstack/react-query';

import { AuthRepository } from '@/auth/domain';
import * as authSchemas from '@/auth/schemas';
import { CardCreate } from '@/cards/domain';
import { UserCreate } from '@/users/domain';

export function useUserRegisterMutation(authRepository: AuthRepository) {
	return useMutation(async (userCreate: authSchemas.UserCreate) => {
		console.log(userCreate);
		return authRepository.register(
			UserCreate.create({
				firstName: userCreate.firstName,
				lastName: userCreate.lastName,
				password: userCreate.password,
				username: userCreate.username
			}),
			CardCreate.create({
				currencyId: userCreate.currencyId,
				PIN: userCreate.PIN
			})
		);
	});
}
