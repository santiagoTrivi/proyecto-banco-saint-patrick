import { Card } from '@/cards/domain';
import { TimeStamp } from '@/shared/domain';

export interface UserProps extends TimeStamp {
	id: string;
	firstName: string;
	lastName: string;
	username: string;
	isActive: boolean;
	cardList: Card[];
}

export class User implements UserProps {
	id: string;
	firstName: string;
	lastName: string;
	fullName: string;
	username: string;
	isActive: boolean;
	cardList: Card[];
	createdAt: Date;
	updatedAt: Date;

	constructor(props: UserProps) {
		this.id = props.id;
		this.firstName = props.firstName;
		this.lastName = props.lastName;
		this.fullName = `${props.firstName} ${props.lastName}`;
		this.username = props.username;
		this.isActive = props.isActive;
		this.cardList = props.cardList;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}

	static create(props: UserProps): User {
		return new User(props);
	}

	nameInitials(): string {
		return this.fullName
			.split(' ')
			.slice(0, 2)
			.map((name) => name[0])
			.join('')
			.toUpperCase();
	}
}