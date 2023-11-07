import { useQuery } from '@tanstack/react-query';

import { AuthRepository } from '@/auth/domain';
import { AuthNestRepository } from '@/auth/services';
import { useAuthStore, useAuthenticatedStore } from '@/auth/state';
import { Card, CardCreateDialog, CardSelector } from '@/cards/components';
import { CardRepository } from '@/cards/domain';
import { CardsNestRepository } from '@/cards/services/cardsNest.repository';
import { CurrenciesRepository } from '@/currencies/domain';
import { useCurrenciesListQuery } from '@/currencies/hooks';
import { CurrenciesNestRepository } from '@/currencies/services';
import { MovementDetail, MovementPreview } from '@/movements/components';
import { MovementFilter, MovementsRepository } from '@/movements/domain';
import { MovementsNestRepository } from '@/movements/services';
import { transactionsQueryKeys } from '@/movements/utils';
import { Dialog, Layout, LoaderResource, Skeleton } from '@/shared/components';
import { forInRange } from '@/shared/utils';
import { Heading, Text } from '@/ui/components';
import { UserCard } from '@/users/components';

type HomePageProps = {
	movementRepository?: MovementsRepository;
	cardsRepository?: CardRepository;
	currenciesRepository?: CurrenciesRepository;
	authRepository?: AuthRepository;
};

const movementFilter = MovementFilter.month();

export function HomePage({
	movementRepository = MovementsNestRepository(),
	cardsRepository = CardsNestRepository(),
	currenciesRepository = CurrenciesNestRepository(),
	authRepository = AuthNestRepository()
}: HomePageProps) {
	const { card, user } = useAuthenticatedStore();
	const onChangeCard = useAuthStore((state) => state.changeCard);

	const { data: currenciesList } = useCurrenciesListQuery(currenciesRepository);

	const { data: movementList, isLoading: isMovementsLoading } = useQuery(
		transactionsQueryKeys.findTransactions({
			cardId: card?.id,
			movementFilter
		}),
		async () => {
			return await movementRepository.findMovements(card.id, {
				movementFilter
			});
		},
		{ enabled: !!card }
	);

	return (
		<Layout>
			<main className="my-8 flex flex-col">
				<div className="mx-auto grid grid-cols-[min(100%,100rem)] gap-4 md:grid-cols-[0.4fr_1.2fr]">
					<UserCard user={user} className="md:min-w-max" />
					<Card
						username={user.username}
						className="max-w-sm"
						card={card}
						cardSelector={
							<>
								<CardSelector
									card={card}
									cardList={user.cardList}
									onChange={onChangeCard}
								/>
								<CardCreateDialog
									cardList={user.cardList}
									cardRepository={cardsRepository}
									authRepository={authRepository}
									currenciesList={currenciesList}
								/>
							</>
						}
					/>
				</div>

				<Heading className="mt-8" component="h2" size="lg">
					Recent Movements
				</Heading>

				<hr className="mb-8 mt-2" />

				<LoaderResource
					isEmpty={!movementList?.items?.length}
					isLoading={isMovementsLoading}
					empty={
						<div className="flex flex-col items-center justify-center space-y-2 text-primary">
							<Heading component="h3">No movements found</Heading>
							<Text className="mt-2">
								You don&apos;t have any movements registered yet.
							</Text>
						</div>
					}
					skeleton={
						<ol className="grid grid-cols-[repeat(auto-fit,minmax(min(24rem,100%),1fr))] gap-4">
							{forInRange(10).map((v) => (
								<Skeleton key={v} className="h-[82px]" />
							))}
						</ol>
					}
					result={
						<ol className="grid grid-cols-[repeat(auto-fit,minmax(min(24rem,100%),1fr))] gap-4">
							{movementList?.items?.map((movement) => (
								<Dialog
									key={movement.id}
									trigger={<MovementPreview movement={movement} />}
									title={`${movement.type}`}
									body={<MovementDetail movement={movement} />}
								/>
							))}
						</ol>
					}
				/>
			</main>
		</Layout>
	);
}
