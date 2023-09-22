import { useAuthStore, useAuthenticatedStore } from '@/auth/state';
import { Card } from '@/cards/components';
import { formatMoney, groupChars } from '@/shared/utils';
import { timeFormatter } from '@/shared/utils/timeFormat';
import { TransactionsNestedRepository } from '@/transactions/services';
import { transactionsQueryKeys } from '@/transactions/utils';
import { Heading, Select, Text } from '@/ui/components';
import { useQuery } from '@tanstack/react-query';

export function HomePage() {
	const { card, user } = useAuthenticatedStore();
	const changeCard = useAuthStore((state) => state.changeCard);

	const { data } = useQuery(
		transactionsQueryKeys.findTransactions(card?.id),
		async () => {
			return await TransactionsNestedRepository().findTransactions(card.id);
		},
		{
			enabled: !!card
		}
	);

	return (
		<div className="text-primary-100">
			<header className="p-4 bg-secondary-700">
				<Heading>
					{user.firstName} {user.lastName}
				</Heading>
			</header>

			<div className="m-4">
				<Card
					className="mx-auto max-w-md"
					card={card}
					cardSelector={
						<Select
							onChange={changeCard}
							value={card.id}
							className="tracking-widest mx-auto mt-4 mb-8 text-center"
						>
							{user.cardList.map((c) => (
								<option key={c.id} value={c.id} className="bg-bg1-800 p-2 m-2">
									{groupChars(c.cardNumber, 4)}
								</option>
							))}
						</Select>
					}
				/>

				<Heading className="my-4">Latest Movements</Heading>

				<div className="flex flex-col gap-y-2">
					{data?.map((transaction) => (
						<div
							key={transaction.id}
							className="p-4 flex items-center border border-tertiary-500/40 rounded-md bg-tertiary-500/10"
						>
							<div className="flex flex-col">
								<Text>{transaction.senderId}</Text>

								<div>
									<Text fontSize="xs">
										{timeFormatter(transaction.createdAt).fromNow()} -{' '}
										{transaction.concept}
									</Text>
								</div>
							</div>

							<Text className="ml-auto">{formatMoney(transaction.amount)}</Text>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
