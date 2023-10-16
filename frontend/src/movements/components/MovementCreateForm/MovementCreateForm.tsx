import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { useAuthenticatedStore } from '@/auth/state';
import { Currency } from '@/currencies/domain';
import {
	MovementCreate,
	MovementType,
	MovementsRepository
} from '@/movements/domain';
import * as movementSchemas from '@/movements/schemas';
import { MovementsNestRepository } from '@/movements/services';
import { movementTestId } from '@/movements/utils';
import {
	Button,
	ErrorMessagge,
	FormControl,
	Input,
	Label,
	Select
} from '@/ui/components';
import { toast } from 'react-toastify';
import { movementCreateFormStyles } from './MovementCreateForm.styles';

type Props = {
	currencyList: Currency[];
	movementsRepository: MovementsRepository;
	className?: string;
};

export const MovementCreateForm = ({
	currencyList,
	movementsRepository = MovementsNestRepository(),
	className
}: Props) => {
	const styles = movementCreateFormStyles();
	const { card, user } = useAuthenticatedStore();
	const cardList = user?.cardList;
	const {
		register,
		handleSubmit,
		getValues,
		watch,
		formState: { errors, isValid }
	} = useForm<movementSchemas.MovementCreate>({
		values: {
			amount: '0',
			// amount: '100',
			cardId: card.id,
			concept: '',
			PIN: '',
			// PIN: '4345',
			// toCard: '',
			// toCard: '4858669658871578',
			type: MovementType.DEPOSIT
		},
		mode: 'all',
		progressive: true,
		resolver: zodResolver(movementSchemas.movementCreate),
		reValidateMode: 'onChange'
	});
	const movementType = watch('type');
	const mut = useMutation(
		async (data: MovementCreate) => {
			if (!currencyList) return;

			return await movementsRepository.create(data, currencyList);
		},
		{
			onSuccess: (data) => {
				toast.success(`${data?.type} movement created`);
			}
		}
	);

	const onSubmit = handleSubmit((data) =>
		mut.mutate({ ...data, amount: Number(data.amount) })
	);

	return (
		<form className={styles.base({ className })} onSubmit={onSubmit}>
			<FormControl>
				<Label>Type</Label>
				<Select
					{...register('type')}
					colorSheme="primary"
					placeholder="Type"
					defaultValue={getValues('type')}
				>
					<option value=" ">Select type</option>
					<option value={MovementType.DEPOSIT}>{MovementType.DEPOSIT}</option>
					<option value={MovementType.TRANSFERENCE}>
						{MovementType.TRANSFERENCE}
					</option>
				</Select>
				<ErrorMessagge
					data-testid={movementTestId.movementTypeError}
					message={errors?.type?.message}
				/>
			</FormControl>

			<FormControl>
				<Label>Amount</Label>
				<Input
					{...register('amount')}
					type="number"
					colorSheme="primary"
					placeholder="Amount"
					// defaultValue={getValues('amount')}
				/>
				<ErrorMessagge
					data-testid={movementTestId.movementAmountError}
					message={errors?.amount?.message}
				/>
			</FormControl>

			<FormControl>
				<Label>Concept</Label>
				<Input
					{...register('concept')}
					type="text"
					colorSheme="primary"
					placeholder="Concept"
					defaultValue={getValues('concept')}
				/>
				<ErrorMessagge
					data-testid={movementTestId.movementConceptError}
					message={errors?.concept?.message}
				/>
			</FormControl>

			<FormControl>
				<Label>Card Id</Label>
				<Select
					{...register('cardId')}
					colorSheme="primary"
					placeholder="Card"
					defaultValue={getValues('cardId')}
				>
					<option value=" ">Select a card</option>
					{cardList?.map((card) => (
						<option key={card.id} value={card.id}>
							{card.cardNumber.format()}
						</option>
					))}
				</Select>
				<ErrorMessagge
					data-testid={movementTestId.movementCardError}
					message={errors?.cardId?.message}
				/>
			</FormControl>

			<FormControl>
				<Label>PIN</Label>
				<Input
					{...register('PIN')}
					type="password"
					colorSheme="primary"
					placeholder="PIN"
					defaultValue={getValues('PIN')}
				/>
				<ErrorMessagge
					data-testid={movementTestId.movementPINError}
					message={errors?.PIN?.message}
				/>
			</FormControl>

			{movementType === MovementType.TRANSFERENCE && (
				<FormControl>
					<Label>To Card</Label>
					<Input
						{...register('toCard')}
						type="text"
						colorSheme="primary"
						placeholder="To Card"
						defaultValue={getValues('toCard')}
					/>
					<ErrorMessagge
						data-testid={movementTestId.movementToCardError}
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						message={(errors as any)?.toCard?.message}
					/>
				</FormControl>
			)}

			<Button
				type="submit"
				disabled={!isValid}
				// disabled={!isValid}
			>
				Create
			</Button>
		</form>
	);
};
