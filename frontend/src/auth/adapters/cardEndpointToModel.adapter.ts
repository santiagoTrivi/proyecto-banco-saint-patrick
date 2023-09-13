import { CardEndpoint } from '@/auth/schemas';
import { Card } from '@/cards/domain';
import { formatMoney, groupChars } from '@/shared/utils';
import { User } from '@/users/domain';

export function cardEndpointToModel(
	c: CardEndpoint,
	username: User['username']
): Card {
	const groupBy = 4;

	return {
		id: c._id,
		cardNumber: c.card_number,
		cardNumberFormatted: groupChars(c.card_number, groupBy),
		balance: c.current_balance,
		balanceFormatted: formatMoney(c.current_balance),
		isActive: c.isActive,
		username
	};
}
