import { CurrenciesRepository } from '@/currencies/domain';
import { useCurrenciesListQuery } from '@/currencies/hooks';
import { CurrenciesNestRepository } from '@/currencies/services';
import { MovementCreateForm } from '@/movements/components';
import { MovementsRepository } from '@/movements/domain';
import { MovementsNestRepository } from '@/movements/services';
import { Layout } from '@/shared/components';
import { Heading } from '@/ui/components';

type MovementsNewPageProps = {
	currenciesRepository?: CurrenciesRepository;
	movementsRepository?: MovementsRepository;
};

export const MovementsNewPage = ({
	currenciesRepository = CurrenciesNestRepository(),
	movementsRepository = MovementsNestRepository()
}: MovementsNewPageProps) => {
	const { data: currencyList } = useCurrenciesListQuery(currenciesRepository);

	return (
		<Layout>
			<div className="m-auto w-full max-w-sm">
				<Heading size="2xl" className="mb-6">
					New Movement
				</Heading>

				<MovementCreateForm
					currencyList={currencyList || []}
					movementsRepository={movementsRepository}
				/>
			</div>
		</Layout>
	);
};
