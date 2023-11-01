import { Token } from '@/auth/domain';
import { CardCreate } from '@/cards/domain';

export interface CardRepository {
	create(card: CardCreate, accessToken?: Token['accessToken']): Promise<void>;
}
