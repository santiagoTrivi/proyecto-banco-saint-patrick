import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { AuthRepository, Credentials } from '@/auth/domain';
import * as AuthSchemas from '@/auth/schemas';
import { AuthNestRepository } from '@/auth/services';
import { useAuthStore } from '@/auth/state';
import { authTestId } from '@/auth/utils';
import { sessionKeys, sessionStorageRepository } from '@/shared/services';
import { webRoutes } from '@/shared/utils';
import { Button, ErrorMessagge, FormControl, Input } from '@/ui/components';

type Props = {
	authRepository?: AuthRepository;
	className?: string;
};

export const LoginForm = ({
	className,
	authRepository = AuthNestRepository()
}: Props) => {
	const setAccessToken = useAuthStore((state) => state.setAccessToken);
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors, isValid }
	} = useForm<AuthSchemas.Credentials>({
		defaultValues: {
			// username: 'erickperez',
			username: 'tommaxwell',
			password: 'tommaxwell'
		},
		mode: 'onBlur',
		progressive: true,
		resolver: zodResolver(AuthSchemas.credentials)
	});

	const {
		mutate: login,
		data,
		isSuccess,
		isError
	} = useMutation(
		async (credentials: AuthSchemas.Credentials) =>
			await authRepository.login(Credentials.create(credentials))
	);

	const onSubmit = handleSubmit((data) => login(data));

	React.useEffect(() => {
		if (isSuccess) {
			setAccessToken(data?.accessToken);

			sessionStorageRepository.setItem(
				sessionKeys.REFRESH_TOKEN,
				data?.refreshToken
			);

			toast.success('Login successful');
		}

		if (isError) {
			toast.error('Something went wrong, please try again later');
		}
	}, [
		data?.accessToken,
		data?.refreshToken,
		isError,
		isSuccess,
		setAccessToken
	]);

	return (
		<form onSubmit={onSubmit} className={className} role="form">
			<FormControl>
				<Input
					{...register('username')}
					autoFocus
					type="text"
					placeholder="Credit card number"
					defaultValue={getValues('username')}
				/>
				<ErrorMessagge
					data-testid={authTestId.cardNumberError}
					message={errors?.username?.message}
				/>
			</FormControl>

			<FormControl>
				<Input
					{...register('password')}
					type="password"
					placeholder="Enter your password"
					defaultValue={getValues('password')}
				/>
				<ErrorMessagge
					data-testid={authTestId.pinError}
					message={errors?.password?.message}
				/>
			</FormControl>

			<Button type="submit" disabled={!isValid}>
				Login
			</Button>

			<hr className="my-4 border-t border-primary-400/20" />

			<Button
				component="a"
				to={webRoutes.auth.register.absolute}
				className="text-center"
				colorScheme="secondary"
				variant="outline"
			>
				Register
			</Button>
		</form>
	);
};
