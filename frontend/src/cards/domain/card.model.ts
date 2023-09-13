import { User } from '@/users/domain';

export interface Card {
	id: string;
	cardNumber: string;
	cardNumberFormatted: string;
	balance: number;
	balanceFormatted: string;
	username: User['username'];
	isActive: boolean;
}
