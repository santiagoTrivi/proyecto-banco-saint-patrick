import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { AuthRepository } from '@/auth/domain';
import * as AuthSchemas from '@/auth/schemas';
import { AuthNestRepository } from '@/auth/services';
import { useAuthStore } from '@/auth/state';
import { authTestId } from '@/auth/utils';
import { Button, ErrorMessagge, FormControl, Input } from '@/ui/components';

type Props = {
	authRepository?: AuthRepository;
};

export const LoginForm = ({ authRepository = AuthNestRepository() }: Props) => {
	const setAccessToken = useAuthStore((state) => state.setAccessToken);
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors, isValid }
	} = useForm<AuthSchemas.Credentials>({
		defaultValues: {
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
	} = useMutation((credentials: AuthSchemas.Credentials) =>
		authRepository.login(credentials)
	);

	const onSubmit = handleSubmit((data) => login(data));

	React.useEffect(() => {
		if (isSuccess) {
			setAccessToken(data?.accessToken);
			toast.success('Login successful');
		}

		if (isError) {
			toast.error('Something went wrong, please try again later');
		}
	}, [data?.accessToken, isError, isSuccess, setAccessToken]);

	return (
		<form
			onSubmit={onSubmit}
			className="flex flex-col gap-y-4 max-w-[280px] w-full"
			role="form"
		>
			<FormControl>
				<Input
					{...register('username')}
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
		</form>
	);
};
