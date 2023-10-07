import { Movement, MovementBase } from '@/movements/domain';
import { timeFormatter } from '@/shared/utils';
import { Text } from '@/ui/components';

type Props = {
	movement: Movement;
};

export const MovementDetail = ({ movement }: Props) => {
	return (
		<Text className="flex flex-col p-4 text-center text-secondary-300">
			<Text component="p" fontSize="xl" className="mb-4 font-black">
				{movement.amount.format()}
			</Text>
			<Text component="p">
				{timeFormatter(movement.createdAt).format('DD/MM/YYYY - HH:mm:ss')}
			</Text>
			<hr className="-m-4 my-2 border-secondary-400/50" />
			<Text component="p">{movement.concept}</Text>

			{MovementBase.isTransference(movement) && (
				<>
					<hr className="-m-4 my-2 border-secondary-400/50" />
					<Text component="p">To: {movement.toCardId} </Text>
				</>
			)}

			<hr className="-m-4 my-2 border-secondary-400/50" />
			<Text>Nº: {movement.id}</Text>
		</Text>
	);
};
