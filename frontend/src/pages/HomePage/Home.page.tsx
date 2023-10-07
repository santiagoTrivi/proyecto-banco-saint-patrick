import { useQuery } from '@tanstack/react-query';

import { useAuthStore, useAuthenticatedStore } from '@/auth/state';
import { Card } from '@/cards/components';
import { CardSelector } from '@/cards/components/CardSelector';
import { MovementDetail, MovementPreview } from '@/movements/components';
import { MovementsRepository } from '@/movements/domain';
import { MovementsNestRepository } from '@/movements/services';
import { transactionsQueryKeys } from '@/movements/utils';
import { Dialog, Layout } from '@/shared/components';
import { Heading } from '@/ui/components';
import { UserCard } from '@/users/components';

type HomePageProps = {
	movementRepository?: MovementsRepository;
};

export function HomePage({
	movementRepository = MovementsNestRepository()
}: HomePageProps) {
	const { card, user } = useAuthenticatedStore();
	const onChangeCard = useAuthStore((state) => state.changeCard);

	const { data: movementList } = useQuery(
		transactionsQueryKeys.findTransactions(card?.id),
		async () => {
			return await movementRepository.findMovements(card.id);
		},
		{ enabled: !!card }
	);

	return (
		<Layout>
			<div className="my-8 flex flex-col">
				<div className="mx-auto grid grid-cols-[min(100%,100rem)] gap-4 md:grid-cols-[0.4fr_1.2fr]">
					<UserCard user={user} className="md:min-w-max" />
					<Card
						className="max-w-sm"
						card={card}
						cardSelector={
							<CardSelector
								card={card}
								cardList={user.cardList}
								onChange={onChangeCard}
							/>
						}
					/>
				</div>

				<Heading className="mt-8" component="h2">
					Recent Movements
				</Heading>

				<hr className="mb-8 mt-2" />

				<ol className="grid grid-cols-[repeat(auto-fit,minmax(min(24rem,100%),1fr))] gap-4">
					{movementList?.map((movement) => (
						<Dialog
							key={movement.id}
							trigger={<MovementPreview movement={movement} />}
							title={`${movement.type}`}
							description={<MovementDetail movement={movement} />}
						/>
					))}
				</ol>
			</div>
		</Layout>
	);
}
