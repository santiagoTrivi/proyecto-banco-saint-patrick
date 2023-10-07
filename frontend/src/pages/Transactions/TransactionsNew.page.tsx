import { useAuthenticatedStore } from '@/auth/state';
import {
	MovementCreateCreator,
	MovementType,
	MovementsRepository
} from '@/movements/domain';
import { MovementsNestRepository } from '@/movements/services';
import { CurrenciesRepository } from '@/src/currencies/domain';
import { CurrenciesNestRepository } from '@/src/currencies/services';
import { Button } from '@/ui/components';
import { useMutation, useQuery } from '@tanstack/react-query';

type TransactionsNewPageProps = {
	currenciesRepository?: CurrenciesRepository;
	movementsRepository?: MovementsRepository;
};

export const TransactionsNewPage = ({
	currenciesRepository = CurrenciesNestRepository(),
	movementsRepository = MovementsNestRepository()
}: TransactionsNewPageProps) => {
	const { card } = useAuthenticatedStore();
	const { data: currencyList } = useQuery([], async () => {
		return await currenciesRepository.findCurrencies();
	});

	const mut = useMutation(async () => {
		if (!currencyList) return;

		await movementsRepository.create(
			MovementCreateCreator({
				amount: 100,
				cardId: card.id,
				concept: 'test',
				PIN: '4345',
				type: MovementType.DEPOSIT
			}),
			currencyList
		);

		// await movementsRepository.create(
		// 	MovementCreateCreator({
		// 		amount: 100,
		// 		cardId: card.id,
		// 		toCard: '4858669658871578',
		// 		concept: 'test',
		// 		PIN: '4345',
		// 		type: MovementType.TRANSFERENCE
		// 	}),
		// 	currencyList
		// );
	});

	return (
		<div className="bg-red-100">
			<Button onClick={() => mut.mutate()}>create</Button>
		</div>
	);
};
