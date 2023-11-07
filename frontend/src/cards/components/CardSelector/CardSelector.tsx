import { Card } from '@/cards/domain';
import { Select } from '@/ui/components';

type Props = {
	card: Card;
	cardList: Card[];
	onChange: (card: Card['id']) => void;
};

export const CardSelector = ({ card, cardList, onChange }: Props) => {
	return (
		<Select
			onChange={(e) => onChange(e.target.value as Card['id'])}
			value={card.id}
			className="text-center tracking-widest"
		>
			{cardList.map((c) => (
				<option key={c.id} value={c.id} className="m-2 bg-bg1-800 p-2">
					{c.cardNumber.format()}
				</option>
			))}
		</Select>
	);
};
