import React from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

import { Card as CardModel } from '@/cards/domain';
import { webRoutes } from '@/shared/utils';
import { Button, Text } from '@/ui/components';
import { User } from '@/users/domain';
import { CardStyles } from './Card.styles';

type Props = {
	card: CardModel;
	username: User['username'];
	cardSelector: React.ReactNode;
} & React.ComponentProps<'div'>;

export const Card = ({
	username,
	card,
	cardSelector,
	className,
	...props
}: Props) => {
	const [showBalance, setShowBalance] = React.useState(false);

	return (
		<div
			{...props}
			className={CardStyles({ className })}
			data-testid={Card.testId}
		>
			<div className="z-10 flex flex-col justify-between">
				<div className="flex justify-between gap-2">
					<div className="flex justify-between">
						<div className="flex items-center justify-center">
							<Text className="mr-2">
								{showBalance ? (
									<span>{card.balance.format()}</span>
								) : (
									<span>{card.balanceHidden()}</span>
								)}
							</Text>

							<Button
								className="flex items-center justify-center gap-2"
								colorScheme="primary"
								size="xs"
								variant="ghost"
								onClick={() => setShowBalance(!showBalance)}
							>
								Show
								{showBalance ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
							</Button>
						</div>
					</div>

					<Button
						component="a"
						to={webRoutes.movements.root}
						colorScheme="primary"
					>
						Movements
					</Button>
				</div>

				<img
					src="/chip-logo.png"
					alt="chip"
					className="mr-auto mt-4 w-12 md:w-14"
				/>

				{cardSelector}

				<div className="flex justify-between">
					<Text fontSize="xs">{username}</Text>
					<Text fontSize="xs">
						{card.isActive ? '✅ Active' : '⛔ Inactive'}
					</Text>
				</div>
			</div>
		</div>
	);
};

Card.testId = 'card';