import { Money } from '@/shared/domain';
import { CardNumber } from './cardNumber';

export interface CardProps {
	id: string;
	cardNumber: CardNumber;
	balance: Money;
	isActive: boolean;
}

export class Card implements CardProps {
	id: string;
	cardNumber: CardNumber;
	balance: Money;
	isActive: boolean;

	constructor(props: CardProps) {
		this.id = props.id;
		this.cardNumber = props.cardNumber;
		this.balance = props.balance;
		this.isActive = props.isActive;
	}

	static create(props: CardProps): Card {
		return new Card(props);
	}

	balanceHidden(): string {
		return this.balance.format().replace(/\d/g, '*');
	}
}
