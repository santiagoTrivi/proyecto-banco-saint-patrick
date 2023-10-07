import { cardStub1, cardStub2 } from '@/tests/cards/fixtures';
import { User } from '@/users/domain';

export const userStub1: User = User.create({
	id: '1',
	username: 'jhon',
	firstName: 'John',
	lastName: 'Doe',
	isActive: true,
	createdAt: new Date(),
	updatedAt: new Date(),
	cardList: [cardStub1]
});

export const userStub2: User = User.create({
	id: '2',
	firstName: 'Jane',
	lastName: 'Doe',
	username: 'jane',
	isActive: true,
	createdAt: new Date(),
	updatedAt: new Date(),
	cardList: [cardStub2]
});
