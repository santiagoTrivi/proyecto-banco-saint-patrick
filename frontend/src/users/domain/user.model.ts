import { Card } from '@/cards/domain';

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	username: string;
	isActive: boolean;
	cardList: Card[];
}
