import { Card } from '@/cards/domain';
import {
	Button,
	FormControl,
	Heading,
	Input,
	Label,
	Select
} from '@/ui/components';
import { MovementFilterControlStyles } from './MovementFilterControl.styles';

type Props = {
	cardId: string;
	cardList: Card[];
	from?: Date | null;
	until?: Date | null;
	onChangeCard?: (criteria: string) => void;
	onChangeFrom?: (criteria: Date | null) => void;
	onChangeUntil?: (criteria: Date | null) => void;

	className?: string;
};

export const MovementFilterControl = ({
	cardId,
	cardList,
	from = null,
	until = null,
	onChangeCard,
	onChangeFrom,
	onChangeUntil,
	className
}: Props) => {
	const styles = MovementFilterControlStyles();

	function handleChangeFrom(e: React.ChangeEvent<HTMLInputElement>) {
		const newFrom = new Date(e.target.value);
		const isUntilAfterFrom = until && newFrom.getTime() < until?.getTime?.();
		if (!until || isUntilAfterFrom) {
			onChangeFrom?.(new Date(e.target.value));
		}
	}

	function handleChangeUntil(e: React.ChangeEvent<HTMLInputElement>) {
		const newUntil = new Date(e.target.value);
		const isFromBeforeUntil = from && newUntil.getTime() > from?.getTime?.();
		if (!from || isFromBeforeUntil) {
			onChangeUntil?.(new Date(e.target.value));
		}
	}

	function handleReset() {
		onChangeCard?.(cardId);
		onChangeFrom?.(null);
		onChangeUntil?.(null);
	}

	return (
		<fieldset className={styles.base({ className })}>
			<Heading component="legend" size="md" className={styles.legend()}>
				Filter
			</Heading>

			<FormControl>
				<Label htmlFor="card" className={styles.label()}>
					Card
				</Label>
				<Select
					id="card"
					onChange={(e) => onChangeCard?.(e.target.value)}
					value={cardId}
					colorSheme="tertiary"
				>
					{cardList.map((card) => (
						<option key={card.id} value={card.id}>
							{card.cardNumber.format()}
						</option>
					))}
				</Select>
			</FormControl>

			<FormControl>
				<Label className={styles.label()} htmlFor="from">
					From
				</Label>
				<Input
					id="from"
					name="from"
					type="date"
					value={from?.toISOString().split('T')[0] || ''}
					onChange={handleChangeFrom}
					colorSheme="tertiary"
				/>
			</FormControl>

			<FormControl>
				<Label className={styles.label()} htmlFor="until">
					Until
				</Label>
				<Input
					id="until"
					type="date"
					value={until?.toISOString().split('T')[0] || ''}
					onChange={handleChangeUntil}
					colorSheme="tertiary"
				/>
			</FormControl>

			<Button colorScheme="tertiary" onClick={handleReset}>
				Reset
			</Button>
		</fieldset>
	);
};
