import { Movement } from '@/movements/domain';
import { timeFormatter } from '@/shared/utils';
import { Text } from '@/ui/components';
import React from 'react';

type Props = {
	movement: Movement;
} & React.ComponentProps<'button'>;

export const MovementPreview = React.forwardRef(function MovementPreview(
	{ movement, ...props }: Props,
	ref: React.ForwardedRef<HTMLButtonElement>
) {
	return (
		<button
			{...props}
			ref={ref}
			className="flex items-center rounded-md border border-tertiary-500/40 bg-tertiary-500/10 p-4 text-primary"
		>
			<div className="flex flex-col">
				<Text className="text-left">{movement.type}</Text>

				<div className="text-left">
					<Text fontSize="xs">
						{timeFormatter(movement.createdAt).fromNow()} - {movement.concept}
					</Text>
				</div>
			</div>

			<Text className="ml-auto">{movement.amount.format()}</Text>
		</button>
	);
});
