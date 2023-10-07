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
			onChange={onChange}
			value={card.id}
			className="mx-auto mb-4 mt-2 text-center tracking-widest md:mb-8 md:mt-4"
		>
			{cardList.map((c) => (
				<option key={c.id} value={c.id} className="m-2 bg-bg1-800 p-2">
					{c.cardNumber.format()}
				</option>
			))}
		</Select>
	);
};
