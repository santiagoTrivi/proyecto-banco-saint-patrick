import { useAuthenticatedStore } from '@/auth/state';
import { Card } from '@/cards/components';
import { Heading } from '@/ui/components';

export function HomePage() {
	const { card, user } = useAuthenticatedStore();

	return (
		<div className="text-primary-100">
			<header className="p-4 bg-secondary-700">
				<Heading>
					{user.firstName} {user.lastName}
				</Heading>
			</header>

			<Card card={card} />

			<div>Lastest Movements</div>
		</div>
	);
}
