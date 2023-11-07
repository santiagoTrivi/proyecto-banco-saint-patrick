import { CardRepository } from '@/cards/domain';

export function CardsStubRepository(): CardRepository {
	return {
		create: async () => {
			return;
		}
	};
}
