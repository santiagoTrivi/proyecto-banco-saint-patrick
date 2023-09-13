import { UserEndpoint } from '@/auth/schemas';
import { User } from '@/users/domain';
import { cardEndpointToModel } from './cardEndpointToModel.adapter';

export function UserEndpointToModel(u: UserEndpoint): User {
	return {
		id: u._id,
		firstName: u.firstName[0].toUpperCase() + u.firstName.slice(1),
		lastName: u.lastName,
		username: u.username,
		isActive: u.isActive,
		cardList: u.cards.map((c) => cardEndpointToModel(c, u.username))
	};
}
