import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { AuthRepository } from '@/auth/domain';
import { useUserRegisterMutation } from '@/auth/hooks';
import * as authSchemas from '@/auth/schemas';
import { AuthNestRepository } from '@/auth/services';
import { useAuthStore } from '@/auth/state';
import { CurrenciesRepository } from '@/currencies/domain';
import { useCurrenciesListQuery } from '@/currencies/hooks';
import { CurrenciesNestRepository } from '@/currencies/services';
import {
	SessionStorageRepository,
	sessionKeys,
	sessionStorageRepository
} from '@/shared/services';
import { getErrorMessage, webRoutes } from '@/shared/utils';
import {
	Button,
	ErrorMessagge,
	FormControl,
	Input,
	Select
} from '@/ui/components';
import { RegisterFormStyles } from './RegisterForm.styles';

type Props = {
	authRepository?: AuthRepository;
	currenciesRepository?: CurrenciesRepository;
	storageRepository?: SessionStorageRepository;
	className?: string;
};

export function RegisterForm({
	className,
	authRepository = AuthNestRepository(),
	currenciesRepository = CurrenciesNestRepository(),
	storageRepository = sessionStorageRepository
}: Props) {
	const setAccessToken = useAuthStore((state) => state.setAccessToken);
	const { data: currenciesList } = useCurrenciesListQuery(currenciesRepository);

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors, isValid }
	} = useForm<authSchemas.UserCreate>({
		values: {
			firstName: '',
			lastName: '',
			username: '',
			password: '',
			confirmPassword: '',
			currencyId: '',
			PIN: ''
		},
		mode: 'onBlur',
		progressive: true,
		resolver: zodResolver(authSchemas.userCreate)
	});

	const {
		mutate: userRegister,
		data: registerData,
		isSuccess,
		error,
		isError
	} = useUserRegisterMutation(authRepository);

	const onSubmit = handleSubmit((data) => userRegister(data));

	React.useEffect(() => {
		if (isSuccess) {
			setAccessToken(registerData?.accessToken);

			storageRepository.setItem(
				sessionKeys.REFRESH_TOKEN,
				registerData?.refreshToken
			);

			toast.success('You have been registered successfully');
		}

		if (isError) {
			console.log(error);
			toast.error(
				getErrorMessage(
					error,
					'There was an error registering the user, try again'
				)
			);
		}
	}, [
		error,
		isError,
		isSuccess,
		registerData?.accessToken,
		registerData?.refreshToken,
		setAccessToken,
		storageRepository
	]);

	return (
		<form
			role="form"
			className={RegisterFormStyles({ className })}
			onSubmit={onSubmit}
		>
			<FormControl>
				<Input
					{...register('firstName')}
					autoFocus
					name="firstName"
					id="firstName"
					type="text"
					placeholder="First Name"
					defaultValue={getValues('firstName')}
				/>
				<ErrorMessagge message={errors.firstName?.message} />
			</FormControl>

			<FormControl>
				<Input
					{...register('lastName')}
					name="lastName"
					id="lastName"
					type="text"
					placeholder="Last Name"
					defaultValue={getValues('lastName')}
				/>
				<ErrorMessagge message={errors.lastName?.message} />
			</FormControl>

			<FormControl>
				<Input
					{...register('username')}
					name="username"
					id="username"
					type="text"
					placeholder="Username"
					defaultValue={getValues('username')}
				/>
				<ErrorMessagge message={errors.username?.message} />
			</FormControl>

			<FormControl>
				<Input
					{...register('password')}
					name="password"
					id="password"
					type="password"
					placeholder="Password"
					defaultValue={getValues('password')}
				/>
				<ErrorMessagge message={errors.password?.message} />
			</FormControl>

			<FormControl>
				<Input
					{...register('confirmPassword')}
					name="confirmPassword"
					id="confirmPassword"
					type="password"
					placeholder="Confirm Password"
					defaultValue={getValues('confirmPassword')}
				/>
				<ErrorMessagge message={errors.confirmPassword?.message} />
			</FormControl>

			<FormControl>
				<Select
					{...register('currencyId')}
					name="currencyId"
					id="currencyId"
					placeholder="Currency"
					defaultValue={getValues('currencyId')}
				>
					<option value="">Select a currency</option>
					{currenciesList?.map((currency) => (
						<option key={currency.id} value={currency.id}>
							{currency.name}
						</option>
					))}
				</Select>
				<ErrorMessagge message={errors.currencyId?.message} />
			</FormControl>

			<FormControl>
				<Input
					{...register('PIN')}
					name="PIN"
					id="PIN"
					type="password"
					placeholder="PIN"
					defaultValue={getValues('PIN')}
				/>
				<ErrorMessagge message={errors.PIN?.message} />
			</FormControl>

			<Button type="submit" disabled={!isValid}>
				Register
			</Button>

			<hr className="my-4 border-t border-primary-400/20" />

			<Button
				component="a"
				to={webRoutes.auth.login.absolute}
				className="text-center"
				colorScheme="secondary"
				variant="outline"
			>
				Login
			</Button>
		</form>
	);
}
