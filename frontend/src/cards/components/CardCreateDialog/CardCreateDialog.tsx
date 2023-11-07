import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { AuthRepository } from '@/auth/domain';
import { useAuthStore, useAuthenticatedStore } from '@/auth/state';
import { Card, CardCreate, CardRepository } from '@/cards/domain';
import * as cardSchemas from '@/cards/schemas';
import { Currency } from '@/currencies/domain';
import { Dialog } from '@/shared/components';
import {
	Button,
	ErrorMessagge,
	FormControl,
	Heading,
	Input,
	Select
} from '@/ui/components';

type Props = {
	cardList: Card[];
	currenciesList?: Currency[];
	cardRepository: CardRepository;
	authRepository: AuthRepository;
};

export const CardCreateDialog = ({
	authRepository,
	cardRepository,
	cardList,
	currenciesList = []
}: Props) => {
	const setUser = useAuthStore((state) => state.setUser);
	const { accessToken } = useAuthenticatedStore();

	const hasTheMaximumNumberOfCards = cardList.length >= 3;
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors, isValid }
	} = useForm<cardSchemas.CardCreate>({
		values: {
			currencyId: '',
			PIN: ''
		},
		mode: 'onBlur',
		progressive: true,
		resolver: zodResolver(cardSchemas.cardCreate)
	});

	const { mutate: cardCreateMut } = useMutation(
		async (cardCreate: cardSchemas.CardCreate) => {
			await cardRepository.create(CardCreate.create(cardCreate), accessToken);
		},
		{
			onSuccess: () => {
				authRepository
					.clientInfo()
					.then((user) => setUser(user))
					.then(() => toast.success('Card created successfully'));
			}
		}
	);

	const onSubmit = handleSubmit((cardCreate) => cardCreateMut(cardCreate));

	return (
		<Dialog
			className="w-full max-w-xs"
			title={
				<Heading className="rounded-t-[inherit] bg-primary-300 py-2 pl-2 pr-8 text-primary-900">
					Register a new card - {cardList.length}/3
				</Heading>
			}
			body={
				<form
					role="form"
					onSubmit={onSubmit}
					className="flex flex-col gap-4 px-4 py-6"
				>
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

					<Button type="submit" disabled={!isValid} className={'mt-4'}>
						Create
					</Button>
				</form>
			}
			trigger={
				<Button
					className={clsx(
						{ hidden: hasTheMaximumNumberOfCards },
						'aspect-[1/1] rounded-full leading-[0]'
					)}
				>
					+
				</Button>
			}
		/>
	);
};
