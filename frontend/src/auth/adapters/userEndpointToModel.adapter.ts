import { UserEndpoint } from '@/auth/schemas';
import { User } from '@/users/domain';
import { cardEndpointToModel } from './cardEndpointToModel.adapter';

export function UserEndpointToModel(u: UserEndpoint): User {
	return User.create({
		...u,
		id: u._id,
		cardList: u.cards.map((c) => cardEndpointToModel(c, u.username))
	});
}
